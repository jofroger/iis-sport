import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Stav_zapasu, Tim, Turnaj, Usporiadatel, Zapas, Podmienky_turnaja} from '../api.structures';

interface TreeBox {
    nazov: String
    score: Number
}

@Component({
  selector: 'app-championship-tree',
  templateUrl: './championship-tree.component.html',
  styleUrls: ['./championship-tree.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ChampionshipTreeComponent implements OnInit {
  index : any = 0;

  actZapas: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: null, vyherca: null, uroven_zapasu: null, turnajID: null};
  zapasy: Zapas[] = [];

  actTurnaj: Turnaj = {id: null, nazov:'', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID: null, usporiadatelID: null};
  turnaje: Turnaj[] = [];

  zapasyUroven1 : Zapas[] = [];
  zapasyUroven2 : Zapas[] = [];
  zapasyUroven3 : Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: null, vyherca: null, uroven_zapasu: null, turnajID: null};

  boxyUroven1 : TreeBox[] = [];
  boxyUroven2 : TreeBox[] = [];
  boxyUroven3 : TreeBox[] = [];

  constructor(private router: Router, private server: ApiService) { }

  ngOnInit() {
    this.getTurnaje();
  }

  getTurnaje() {
    this.server.getAllTurnaj().then( (resp:any) => {
      this.turnaje = resp.map( (tu) => {
        tu.id = tu.TurnajID;
        tu.nazov = tu.Nazov;
        tu.zaciatok = tu.Zaciatok;
        tu.koniec = tu.Koniec;
        tu.vyhra = tu.Vyhra;
        tu.sponzori = tu.Sponzori;
        tu.povrch = tu.Povrch;
        tu.podmienky_turnajaID = tu.Podmienky_turnajaID;
        tu.uzivatelID = tu.UzivatelID;
        return tu;
      })

      this.setActTurnaj(this.index);
    })
  }

  setActTurnaj(idx) {
    this.index = idx;
    this.actTurnaj = this.turnaje[this.index];
    this.fillTree();
  }

  fillTree() {
    this.getZapasyByUroven();
    //this.fillUrovne();
  }

  getZapasyByUroven() {
    this.server.getZapasByTurnajAndUroven(this.actTurnaj, 1).then( (resp:any) => {
      this.zapasyUroven1 = resp.map( (za) => {
          za.id = za.ZapasID;
          za.nazov = za.Nazov;
          za.miesto = za.Miesto;
          za.datum = za.Datum;
          za.stav = za.Stav;
          za.vyherca = za.Vyherca;
          za.uroven_zapasu = za.Uroven_zapasu;
          za.turnajID = za.TurnajID;
          return za;
        });

        this.fillUroven1();
    });

    this.server.getZapasByTurnajAndUroven(this.actTurnaj, 2).then( (resp:any) => {
      this.zapasyUroven2 = resp.map( (za) => {
          za.id = za.ZapasID;
          za.nazov = za.Nazov;
          za.miesto = za.Miesto;
          za.datum = za.Datum;
          za.stav = za.Stav;
          za.vyherca = za.Vyherca;
          za.uroven_zapasu = za.Uroven_zapasu;
          za.turnajID = za.TurnajID;
          return za;
        });

        this.fillUroven2();
    });

    this.server.getZapasByTurnajAndUroven(this.actTurnaj, 3).then( (resp:any) => {
      this.zapasyUroven3 = resp.map( (za) => {
          za.id = za.ZapasID;
          za.nazov = za.Nazov;
          za.miesto = za.Miesto;
          za.datum = za.Datum;
          za.stav = za.Stav;
          za.vyherca = za.Vyherca;
          za.uroven_zapasu = za.Uroven_zapasu;
          za.turnajID = za.TurnajID;
          return za;
        });

        this.fillUroven3();
    });
  }

  fillUroven1() {
    this.boxyUroven1 = [];
    for (let i = 0; i < 8; i++) {
      let box : TreeBox = {nazov:'', score: null};
      this.boxyUroven1.push(box);
    }

    let podm: Podmienky_turnaja = {
      id: this.actTurnaj.podmienky_turnajaID,
      minimalny_vek_hracov: null,
      pocet_hracov_v_tyme: null,
      pocet_tymov: null,
      registracny_poplatok: '',
      druh_hry: ''
    }

    this.server.getPodmienky_turnaja(podm).then( (resp:any) => {
      podm.pocet_hracov_v_tyme = resp[0].Pocet_hracov_v_tyme;

      if (podm.pocet_hracov_v_tyme === 1) {
        let boxIdxNazov = 0;
        let boxIdxScore = 0;

        for (let i = 0; i < this.zapasyUroven1.length; i++) {
          this.server.getUzivatelByZapas(this.zapasyUroven1[i]).then( (resp:any) => {
            this.boxyUroven1[boxIdxNazov++].nazov = resp[0].Meno + ' ' + resp[0].Priezvisko;
            this.boxyUroven1[boxIdxNazov++].nazov = resp[1].Meno + ' ' + resp[1].Priezvisko;
          })
          this.server.getStav_zapasuByZapas(this.zapasyUroven1[i]).then( (resp:any) => {
            if (resp.length === 0) {
              this.boxyUroven1[boxIdxScore++].score = 0;
              this.boxyUroven1[boxIdxScore++].score = 0;
            }
            else {
              this.boxyUroven1[boxIdxScore++].score = resp[0].Ziskane_sety;
              this.boxyUroven1[boxIdxScore++].score = resp[1].Ziskane_sety;
            }
          })
        }
      }
      else {
        let boxIdxNazov = 0;
        let boxIdxScore = 0;

        for (let i = 0; i < this.zapasyUroven1.length; i++) {
          this.server.getTimByZapas(this.zapasyUroven1[i]).then( (resp:any) => {
            this.boxyUroven1[boxIdxNazov++].nazov = resp[0].Nazov;
            this.boxyUroven1[boxIdxNazov++].nazov = resp[1].Nazov;
          })
          this.server.getStav_zapasuByZapas(this.zapasyUroven1[i]).then( (resp:any) => {
            if (resp.length === 0) {
              this.boxyUroven1[boxIdxScore++].score = 0;
              this.boxyUroven1[boxIdxScore++].score = 0;
            }
            else {
              this.boxyUroven1[boxIdxScore++].score = resp[0].Ziskane_sety;
              this.boxyUroven1[boxIdxScore++].score = resp[1].Ziskane_sety;
            }
          })
        }
      }
    })
  }

  fillUroven2() {
    this.boxyUroven2 = [];
    for (let i = 0; i < 4; i++) {
      let box : TreeBox = {nazov:'', score: null};
      this.boxyUroven2.push(box);
    }

    let podm: Podmienky_turnaja = {
      id: this.actTurnaj.podmienky_turnajaID,
      minimalny_vek_hracov: null,
      pocet_hracov_v_tyme: null,
      pocet_tymov: null,
      registracny_poplatok: '',
      druh_hry: ''
    }

    this.server.getPodmienky_turnaja(podm).then( (resp:any) => {
      podm.pocet_hracov_v_tyme = resp[0].Pocet_hracov_v_tyme;

      if (podm.pocet_hracov_v_tyme === 1) {
        let boxIdxNazov = 0;
        let boxIdxScore = 0;

        for (let i = 0; i < this.zapasyUroven2.length; i++) {
          this.server.getUzivatelByZapas(this.zapasyUroven2[i]).then( (resp:any) => {
            this.boxyUroven2[boxIdxNazov++].nazov = resp[0].Meno + ' ' + resp[0].Priezvisko;
            this.boxyUroven2[boxIdxNazov++].nazov = resp[1].Meno + ' ' + resp[1].Priezvisko;
          })
          this.server.getStav_zapasuByZapas(this.zapasyUroven2[i]).then( (resp:any) => {
            if (resp.length === 0) {
              this.boxyUroven2[boxIdxScore++].score = 0;
              this.boxyUroven2[boxIdxScore++].score = 0;
            }
            else {
              this.boxyUroven2[boxIdxScore++].score = resp[0].Ziskane_sety;
              this.boxyUroven2[boxIdxScore++].score = resp[1].Ziskane_sety;
            }
          })
        }
      }
      else {
        let boxIdxNazov = 0;
        let boxIdxScore = 0;

        for (let i = 0; i < this.zapasyUroven2.length; i++) {
          this.server.getTimByZapas(this.zapasyUroven2[i]).then( (resp:any) => {
            this.boxyUroven2[boxIdxNazov++].nazov = resp[0].Nazov;
            this.boxyUroven2[boxIdxNazov++].nazov = resp[1].Nazov;
          })
          this.server.getStav_zapasuByZapas(this.zapasyUroven2[i]).then( (resp:any) => {
            if (resp.length === 0) {
              this.boxyUroven2[boxIdxScore++].score = 0;
              this.boxyUroven2[boxIdxScore++].score = 0;
            }
            else {
              this.boxyUroven2[boxIdxScore++].score = resp[0].Ziskane_sety;
              this.boxyUroven2[boxIdxScore++].score = resp[1].Ziskane_sety;
            }
          })
        }
      }
    })
  }

  fillUroven3() {
    this.boxyUroven3 = [];
    for (let i = 0; i < 2; i++) {
      let box : TreeBox = {nazov:'', score: null};
      this.boxyUroven3.push(box);
    }

    let podm: Podmienky_turnaja = {
      id: this.actTurnaj.podmienky_turnajaID,
      minimalny_vek_hracov: null,
      pocet_hracov_v_tyme: null,
      pocet_tymov: null,
      registracny_poplatok: '',
      druh_hry: ''
    }

    this.server.getPodmienky_turnaja(podm).then( (resp:any) => {
      podm.pocet_hracov_v_tyme = resp[0].Pocet_hracov_v_tyme;

      if (podm.pocet_hracov_v_tyme === 1) {
        let boxIdxNazov = 0;
        let boxIdxScore = 0;

        this.server.getUzivatelByZapas(this.zapasyUroven3[0]).then( (resp:any) => {
          this.boxyUroven3[boxIdxNazov++].nazov = resp[0].Meno + ' ' + resp[0].Priezvisko;
          this.boxyUroven3[boxIdxNazov++].nazov = resp[1].Meno + ' ' + resp[1].Priezvisko;
        })
        this.server.getStav_zapasuByZapas(this.zapasyUroven3[0]).then( (resp:any) => {
          if (resp.length === 0) {
            this.boxyUroven3[boxIdxScore++].score = 0;
            this.boxyUroven3[boxIdxScore++].score = 0;
          }
          else {
            this.boxyUroven3[boxIdxScore++].score = resp[0].Ziskane_sety;
            this.boxyUroven3[boxIdxScore++].score = resp[1].Ziskane_sety;
          }
        })
      }
      else {
        let boxIdxNazov = 0;
        let boxIdxScore = 0;

        this.server.getTimByZapas(this.zapasyUroven3[0]).then( (resp:any) => {
          this.boxyUroven3[boxIdxNazov++].nazov = resp[0].Nazov;
          this.boxyUroven3[boxIdxNazov++].nazov = resp[1].Nazov;
        })
        this.server.getStav_zapasuByZapas(this.zapasyUroven3[0]).then( (resp:any) => {
          if (resp.length === 0) {
            this.boxyUroven3[boxIdxScore++].score = 0;
            this.boxyUroven3[boxIdxScore++].score = 0;
          }
          else {
            this.boxyUroven3[boxIdxScore++].score = resp[0].Ziskane_sety;
            this.boxyUroven3[boxIdxScore++].score = resp[1].Ziskane_sety;
          }
        })
      }
    })
  }
}





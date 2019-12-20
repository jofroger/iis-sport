import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Stav_zapasu, Tim, Turnaj, Usporiadatel, Zapas, Podmienky_turnaja, Rozhodca, Uzivatel, Hrac} from '../api.structures';

interface TreeBox {
    nazov: String
    score: Number
}

interface RozhodcaWithName {
  id : Number
  meno: String
  typ: String
  uzivatelID: Number
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

  actTurnaj: Turnaj = {id: null, nazov:'', stav_turnaja: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID: null, usporiadatelID: null};
  turnaje: Turnaj[] = [];
  
  registeredUsers : any[] = [];
  registeredRef : RozhodcaWithName[] = [];
  playerTeams : Tim[] = []

  selectedType : String = 'hlavný';
  selectedTim : String = 'none';

  spiderEn : Boolean

  playerEn : Boolean;
  alreadyPlaying : Boolean = true;
  alreadyRef : Boolean;
  isLogout : Boolean = (localStorage.getItem('userId') == null)

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
        tu.stav_turnaja = tu.Stav_turnaja;
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

  getYourTeams() {
    let actUzivatel: Uzivatel = {id: Number(localStorage.getItem('userId')), meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:'', typ: ''};
    this.server.getTimByUzivatel(actUzivatel).then( (resp: any) => {
      this.playerTeams = resp.map( (tim) => {
        tim.id = tim.TimID;
        tim.nazov = tim.Nazov;
        return tim;
      });
    });
  }

  setActTurnaj(idx) {
    this.index = idx;
    this.actTurnaj = this.turnaje[this.index];
    this.spiderEn = (this.actTurnaj.stav_turnaja != 'planovany');
    
    if (this.spiderEn) {
      this.fillTree();
    }
    else {
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
        this.playerEn = podm.pocet_hracov_v_tyme === 1

        this.actPlayerTable();
        this.actRefTable();
      })

      this.getYourTeams();
    }
  }

  actPlayerTable() {
    if (this.playerEn) {
      this.server.getUzivatelHracByTurnaj(this.actTurnaj).then( (resp: any) => {
        this.registeredUsers = resp.map( (pl) => {
          pl.id = pl.HracID;
          pl.meno = pl.Meno + ' ' + pl.Priezvisko;
          pl.uzivatelID = pl.UzivatelID;
          return pl;
       });

        this.alreadyPlaying = typeof this.registeredUsers.find(el => el.uzivatelID == Number(localStorage.getItem('userId'))) != 'undefined';
     });
    }
    else {
      let actUzivatel: Uzivatel = {id: Number(localStorage.getItem('userId')), meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:'', typ: ''};
      this.server.getTimByUzivatel(actUzivatel).then( (resp: any) => {
      this.playerTeams = resp.map( (tim) => {
        tim.id = tim.TimID;
        tim.nazov = tim.Nazov;
        return tim;
      });

      this.server.getTurnajByTim(this.actTurnaj).then( (resp: any) => {
        this.registeredUsers = resp.map( (tim) => {
          tim.id = tim.TimID;
          tim.meno = tim.Nazov;
          return tim;
        });

        if (this.playerTeams.length > 0) {
          this.alreadyPlaying = typeof this.registeredUsers.find(el => el.id == this.playerTeams[0].id) != 'undefined';
          if (this.playerTeams.length > 1) {
            this.alreadyPlaying = typeof this.registeredUsers.find(el => el.id == this.playerTeams[1].id) != 'undefined';
          }
        }
      });
    });
    }
  }

  addPlayer() {
    if (this.playerEn) {
      let actUzivatel: Uzivatel = {id: Number(localStorage.getItem('userId')), meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:'', typ: ''};
      this.server.getHracByUzivatel(actUzivatel).then( (resp: any) => {
        if (resp.length === 0) alert("Nie ste hráčom! Stať sa hráčom môžete na stráke 'Môj účet'"); //todo + kontrola na rozhodcu
        else {

          let actHrac: Hrac = {
            id: resp[0].HracID,
            odohrane_zapasy: "",
            pocet_vyhier: null,
            fotka: '',
            uzivatelID: null
          }
          this.server.createHrac_chce_hrat(this.actTurnaj, actHrac).then((resp:any) => {
            this.actPlayerTable();
          });
        }
      });
    }
    else {
      if (this.selectedTim == 'none') alert("Nie si v ziadnom time!");
      else {

        let actTim: Tim = {id: Number(this.selectedTim), nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
        this.server.createTim_chce_hrat(this.actTurnaj, actTim).then( (resp:any) => {
          this.actPlayerTable();
        })
      }
    }
  }

  actRefTable() {
    this.server.getRozhodcaByTurnajWithName(this.actTurnaj).then( (resp: any) => {
       this.registeredRef = resp.map( (ro) => {
        ro.id = ro.RozhodcaID;
        ro.meno = ro.Meno + ' ' + ro.Priezvisko;
        ro.typ = ro.Typ;
        ro.uzivatelID = ro.UzivatelID;
        return ro;
      });

      this.alreadyRef = typeof this.registeredRef.find(el => el.uzivatelID == Number(localStorage.getItem('userId'))) != 'undefined';
    });
  }

  addReferee() {
    let newRozh : Rozhodca = {
      id: null, 
      typ: this.selectedType, 
      uzivatelID: Number(localStorage.getItem('userId'))
    }

    this.server.createRozhodca(newRozh).then( (resp: any) => {
      
      let newRozh : Rozhodca = {
        id: resp.insertId, 
        typ: '', 
        uzivatelID: null
      }
      this.server.createRozhoduje_turnaj(this.actTurnaj, newRozh).then( (resp:any) => {
        this.actRefTable();
      })
    })
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





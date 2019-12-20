import { Component, OnInit } from '@angular/core';

import { Tim, Uzivatel, Zapas, Rozhodca, Turnaj, Stav_zapasu, Podmienky_turnaja, Hrac } from '../api.structures'
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-referee-centre',
  templateUrl: './referee-centre.component.html',
  styleUrls: ['./referee-centre.component.css']
})
export class RefereeCentreComponent implements OnInit {

  index : any = 0;
  isStarted : boolean = false;
  isEnded : boolean = false;
  btnIsPlan : boolean = false;
  btnIsPlaying : boolean = false;

  actZapas: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: null, vyherca: null, uroven_zapasu: null, turnajID: null};
  zapasy: Zapas[] = [];
  actRozhodca: Rozhodca = {id: null, typ: '', uzivatelID: null};
  actTurnaj: Turnaj = {id: null, nazov:'', stav_turnaja: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID: null, usporiadatelID: null};

  //stavZapasu : Stav_zapasu[] = [];
  stavZapasu1 : Stav_zapasu = {
    id: null,
    ziskane_sety: null,
    ziskane_gemy: null,
    ziskane_vymeny: null,
    hracID: null,
    timID: null,
    zapasID: null
  };
  stavZapasu2 : Stav_zapasu= {
    id: null,
    ziskane_sety: null,
    ziskane_gemy: null,
    ziskane_vymeny: null,
    hracID: null,
    timID: null,
    zapasID: null
  };
  meno1 : String;
  meno2 : String;


  constructor(private server : ApiService, private router : Router) { }

  ngOnInit() {
    this.getZapasy();
  }

  getZapasy() {
    let actUzivatel : Uzivatel = {
      id: Number(localStorage.getItem('userId')),
      meno: '',
      priezvisko: '',
      email: '',
      vek: null,
      login: '',
      heslo:'',
      typ:''
    };

    this.server.getRozhodcaByUzivatel(actUzivatel).then( (resp:any) => {
      this.actRozhodca.id = resp[0].RozhodcaID;
      this.actRozhodca.typ = resp[0].Typ;
      this.actRozhodca.uzivatelID = resp[0].UzivatelID;

      this.server.getZapasByRozhodca(this.actRozhodca).then( (resp:any) => {
        this.zapasy = resp.map( (za) => {
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

        this.setActZapas(this.index);
      })
    })
  }


  getStavZapasu() {
    this.server.getStav_zapasuByZapas(this.actZapas).then( (resp:any) => {

      this.stavZapasu1.ziskane_sety = resp[0].Ziskane_sety;
      this.stavZapasu1.ziskane_gemy = resp[0].Ziskane_gemy;
      this.stavZapasu1.ziskane_vymeny = resp[0].Ziskane_vymeny;
      this.stavZapasu1.hracID = resp[0].HracID;
      this.stavZapasu1.timID = resp[0].TimID;

      this.stavZapasu2.ziskane_sety = resp[1].Ziskane_sety;
      this.stavZapasu2.ziskane_gemy = resp[1].Ziskane_gemy;
      this.stavZapasu2.ziskane_vymeny = resp[1].Ziskane_vymeny;
      this.stavZapasu2.hracID = resp[1].HracID;
      this.stavZapasu2.timID = resp[1].TimID;


      let podmTurn : Podmienky_turnaja = {
        id: this.actTurnaj.podmienky_turnajaID,
        minimalny_vek_hracov: null,
        pocet_hracov_v_tyme: null,
        pocet_tymov: null,
        registracny_poplatok: '',
        druh_hry: ''
      }

      this.server.getPodmienky_turnaja(podmTurn).then( (resp:any) => {
        podmTurn.pocet_hracov_v_tyme = resp[0].Pocet_hracov_v_tyme;

        if (podmTurn.pocet_hracov_v_tyme === 1) {
          let tmpHrac : Hrac[] = [];

          this.server.getHracByZapas(this.actZapas).then( (resp:any) => {
            tmpHrac = resp.map( (hr) => {
              hr.id = hr.HracID;
              hr.uzivatelID = hr.UzivatelID;
              return hr;
            });

            let tmpUziv: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:'', typ:''};
            tmpUziv.id = tmpHrac[0].uzivatelID;
            this.server.getUzivatel(tmpUziv).then( (resp:any) => {
              this.meno1 = resp[0].Meno + ' ' + resp[0].Priezvisko;
            })

            tmpUziv.id = tmpHrac[1].uzivatelID;
            this.server.getUzivatel(tmpUziv).then( (resp:any) => {
              this.meno2 = resp[0].Meno + ' ' + resp[0].Priezvisko;
            })
          })
        }
        else {
          let tmpTim : Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};

          tmpTim.id = this.stavZapasu1.timID;
          this.server.getTim(tmpTim).then( (resp:any) => {
            this.meno1 = resp[0].Nazov;
          })

          tmpTim.id = this.stavZapasu2.timID;
          this.server.getTim(tmpTim).then( (resp:any) => {
            this.meno2 = resp[0].Nazov;
          })
        }
      })
    })
  }

  setActZapas(idx) {
    this.index = idx;
    this.actZapas = this.zapasy[this.index];

    this.btnIsPlan = (this.actZapas.stav === 'planovany');
    this.btnIsPlaying = (this.actZapas.stav === 'prebieha');
    this.isStarted = (this.actZapas.stav === 'prebieha');
    this.isEnded = (this.actZapas.stav === 'ukonceny');
    this.getStavZapasu();

    this.actTurnaj.id = this.actZapas.turnajID;
    this.server.getTurnaj(this.actTurnaj).then( (resp:any) => {
      this.actTurnaj.nazov = resp[0].Nazov;
      this.actTurnaj.podmienky_turnajaID = resp[0].Podmienky_turnajaID;
    })
  }

  startMatch() {
    this.isStarted = true;
    this.btnIsPlan = false;
    this.btnIsPlaying = true;
    this.actZapas.stav = 'prebieha';
    this.server.updateZapas(this.actZapas);

    let podmTurn : Podmienky_turnaja = {
      id: this.actTurnaj.podmienky_turnajaID,
      minimalny_vek_hracov: null,
      pocet_hracov_v_tyme: null,
      pocet_tymov: null,
      registracny_poplatok: '',
      druh_hry: ''
    }

    this.server.getPodmienky_turnaja(podmTurn).then( (resp:any) => {
      podmTurn.pocet_hracov_v_tyme = resp[0].Pocet_hracov_v_tyme;

      this.stavZapasu1.zapasID = this.actZapas.id;
      this.stavZapasu2.zapasID = this.actZapas.id;

      if (podmTurn.pocet_hracov_v_tyme === 1) {
        let tmpHrac : Hrac[] = [];

        this.server.getHracByZapas(this.actZapas).then( (resp:any) => {
          tmpHrac = resp.map( (hr) => {
            hr.id = hr.HracID;
            hr.uzivatelID = hr.UzivatelID;
            return hr;
          });

          let tmpUziv: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:'', typ:''};
          tmpUziv.id = tmpHrac[0].uzivatelID;
          this.server.getUzivatel(tmpUziv).then( (resp:any) => {
            this.meno1 = resp[0].Meno + ' ' + resp[0].Priezvisko;
          })

          tmpUziv.id = tmpHrac[1].uzivatelID;
          this.server.getUzivatel(tmpUziv).then( (resp:any) => {
            this.meno2 = resp[0].Meno + ' ' + resp[0].Priezvisko;
          })

          this.stavZapasu1.hracID = tmpHrac[0].id;
          this.server.createStav_zapasu(this.stavZapasu1).then( () => {
            this.server.getStav_zapasuByZapas(this.actZapas).then( (resp: any) => {
              this.stavZapasu1.id = resp[0].Stav_zapasuID;
            })
          });

          this.stavZapasu2.hracID = tmpHrac[1].id;
          this.server.createStav_zapasu(this.stavZapasu2).then( () => {
            this.server.getStav_zapasuByZapas(this.actZapas).then( (resp: any) => {
              this.stavZapasu2.id = resp[1].Stav_zapasuID;
            })
          });
        })
      }
      else {
        let tmpTim : Tim[] = [];

        this.server.getTimByZapas(this.actZapas).then( (resp:any) => {
          tmpTim = resp.map( (tim) => {
            tim.id = tim.TimID;
            tim.nazov = tim.Nazov;
            return tim;
          })

          this.meno1 = tmpTim[0].nazov;
          this.meno2 = tmpTim[1].nazov;

          this.stavZapasu1.timID = tmpTim[0].id;
          this.server.createStav_zapasu(this.stavZapasu1).then( () => {
            this.server.getStav_zapasuByZapas(this.actZapas).then( (resp: any) => {
              this.stavZapasu1.id = resp[0].Stav_zapasuID;
            })
          });

          this.stavZapasu2.timID = tmpTim[1].id;
          this.server.createStav_zapasu(this.stavZapasu2).then( () => {
            this.server.getStav_zapasuByZapas(this.actZapas).then( (resp: any) => {
              this.stavZapasu2.id = resp[1].Stav_zapasuID;
            })
          });
        })
      }
    })
  }

  actMatch() {
    this.server.updateStav_zapasu(this.stavZapasu1);
    this.server.updateStav_zapasu(this.stavZapasu2);
    alert("Stav bol aktualizovaný")
  }

  endMatch() {
    this.isEnded = true;
    this.isStarted = false;
    this.btnIsPlaying = false;
    this.actZapas.stav = 'ukonceny'
    this.server.updateZapas(this.actZapas);
    this.getStavZapasu();
  }

}

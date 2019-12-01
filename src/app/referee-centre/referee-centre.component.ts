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
  isStarted : boolean;
  isEnded : boolean;

  actZapas: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: null, vyherca: null, uroven_zapasu: null, turnajID: null};
  zapasy: Zapas[] = [];
  actRozhodca: Rozhodca = {id: null, typ: '', uzivatelID: null};
  actTurnaj: Turnaj = {id: null, nazov:'', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID: null, uzivatelID: null};

  //stavZapasu : Stav_zapasu[] = [];
  stavZapasu1 : Stav_zapasu= {
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
          za.turnajID = za.TurnajID;
          return za;
        });
        
        this.setActZapas(this.index);
      })
    })
  }
/*
  updateUzivatel() {
    this.server.updateUzivatel(this.actUzivatel).then( () => {
      this.getUzivatelia();
    })
  }
*/
  getStavZapasu() {
    this.server.getStav_zapasuByZapas(this.actZapas).then( (resp:any) => {
      this.stavZapasu = resp.map( (sz) => {
        sz.ziskane_sety = sz.Ziskane_sety;
        sz.ziskane_gemy = sz.Ziskane_gemy;
        sz.ziskane_vymeny = sz.Ziskane_vymeny;
        sz.hracID = sz.HracID;
        sz.timID = sz.TimID;
        return sz;
      })

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
          let tmpHrac : Hrac = { id: null, odohrane_zapasy: '', pocet_vyhier: null, fotka: '', uzivatelID: null };
         
          tmpHrac.id = this.stavZapasu[0].hracID;
          this.server.getHrac(tmpHrac).then( (resp:any) => {
            this.meno1 = resp[0].Meno + ' ' + resp[0].Priezvisko;
          })

          tmpHrac.id = this.stavZapasu[1].hracID;
          this.server.getHrac(tmpHrac).then( (resp:any) => {
            this.meno2 = resp[0].Meno + ' ' + resp[0].Priezvisko;
          })
        }
        else {
          let tmpTim : Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
         
          tmpTim.id = this.stavZapasu[0].timID;
          this.server.getTim(tmpTim).then( (resp:any) => {
            this.meno1 = resp[0].Nazov;
          })

          tmpTim.id = this.stavZapasu[1].timID;
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

    this.isStarted = (this.actZapas.stav === 'prebieha');
    this.isEnded = (this.actZapas.stav === 'ukonceny');
    if (this.isEnded) this.getStavZapasu(); 

    this.actTurnaj.id = this.actZapas.turnajID;
    this.server.getTurnaj(this.actTurnaj).then( (resp:any) => {
      this.actTurnaj.nazov = resp[0].Nazov;
      this.actTurnaj.podmienky_turnajaID = resp[0].Podmienky_turnajaID;
    })
  }

  startMatch() {
    this.isStarted = true;
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

    let newStavZap : Stav_zapasu = {
      id: null,
      ziskane_sety: 0,
      ziskane_gemy: 0,
      ziskane_vymeny: 0,
      hracID: null,
      timID: null,
      zapasID: this.actZapas.id
    }

    this.server.getPodmienky_turnaja(podmTurn).then( (resp:any) => {
      podmTurn.pocet_hracov_v_tyme = resp[0].Pocet_hracov_v_tyme;
      
      if (podmTurn.pocet_hracov_v_tyme === 1) {
        let tmpHrac : Hrac[] = [];

        this.server.getHracByZapas(this.actZapas).then( (resp:any) => {
          tmpHrac = resp.map( (hr) => {
            hr.id = hr.HracID;
            return hr;
          })
          
          

          newStavZap.hracID = tmpHrac[0].id;
          this.stavZapasu.push(newStavZap);
          this.server.createStav_zapasu(newStavZap);
          newStavZap.hracID = tmpHrac[1].id;
          this.stavZapasu.push(newStavZap);
          this.server.createStav_zapasu(newStavZap);
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
          
          newStavZap.timID = tmpTim[0].id;
          this.stavZapasu.push(newStavZap);
          this.server.createStav_zapasu(newStavZap).then( () => {
            this.server.getStav_zapasuByZapas(this.actZapas).then( (resp: any) => {
              this.stavZapasu[0].id = resp[0].Stav_zapasuID;
            })
          });

          newStavZap.timID = tmpTim[1].id;
          this.stavZapasu.push(newStavZap);
          this.server.createStav_zapasu(newStavZap).then( () => {
            this.server.getStav_zapasuByZapas(this.actZapas).then( (resp: any) => {
              this.stavZapasu[0].id = resp[0].Stav_zapasuID;
            })
          });
        })
      }
    })
  }

  actMatch() {
    this.server.updateStav_zapasu(this.stavZapasu[0]);
    this.server.updateStav_zapasu(this.stavZapasu[1]);
    alert("Stav bol aktualizovaný")
  }

  endMatch() {
    this.isEnded = true;
    this.isStarted = false;
    this.actZapas.stav = 'ukonceny';
  }

}

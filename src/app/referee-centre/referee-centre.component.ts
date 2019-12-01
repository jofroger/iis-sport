import { Component, OnInit } from '@angular/core';

import { Uzivatel, Zapas, Rozhodca, Turnaj } from '../api.structures'
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-referee-centre',
  templateUrl: './referee-centre.component.html',
  styleUrls: ['./referee-centre.component.css']
})
export class RefereeCentreComponent implements OnInit {

  index : any = 0;
  actZapas: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: null, vyherca: null, uroven_zapasu: null, turnajID: null};
  zapasy: Zapas[] = [];
  actRozhodca: Rozhodca = {id: null, typ: '', uzivatelID: null};

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
        console.log(this.zapasy);
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
  setActZapas(idx) {
    this.index = idx;
    this.actZapas = this.zapasy[this.index];
  }

}

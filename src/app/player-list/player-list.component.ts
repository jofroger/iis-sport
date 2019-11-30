import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Hrac, Uzivatel, Tim } from '../api.structures'
import { ApiService } from '../api.service';
import { PlayerListResolveService } from '../player-list-resolve.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  hraci : Hrac[] = [];
  actHrac : Hrac = { id: null, odohrane_zapasy: '', pocet_vyhier: null, fotka: '', uzivatelID: null }
  actUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:'', typ:''};
  timy: Tim[] = [];
  uzivatelia: Uzivatel[] = [];

  constructor(private server : ApiService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.getUzivatelAndHrac();
    
  }

  getUzivatelAndHrac() {
    this.server.getUzivatelAndHrac().then( (resp:any) => {
      this.uzivatelia = resp.map( (uz) => {
        uz.id = uz.UzivatelID;
        uz.meno = uz.Meno;
        uz.priezvisko = uz.Priezvisko;
        uz.vek = uz.Vek;
        return uz;
      })
      this.hraci = resp.map( (hr) => {
        hr.id = hr.HracID;
        hr.odohrane_zapasy = hr.Odohrane_zapasy;
        hr.pocet_vyhier = hr.Pocet_vyhier;
        hr.fotka = hr.Fotka;
        return hr;
      })

      this.setActPlayer(0);
    })
  }

  getTimy() {
    this.server.getTimByHrac(this.actHrac).then( (resp : any) => {
      this.timy = resp.map( (tim) => {
        tim.nazov = tim.Nazov;
        return tim;
      });
    })
  }

  setActPlayer(idx) {
    this.actUzivatel = this.uzivatelia[idx];
    this.actHrac = this.hraci[idx];
    this.getTimy();
  }
  
}

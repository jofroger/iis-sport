import { Component, OnInit } from '@angular/core';
import { Hrac, Uzivatel, Tim } from '../api.structures'
import { ApiService } from '../api.service';

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

  constructor(private server : ApiService) { }

  ngOnInit() {
    this.getHraci();
    //this.getHrac();
    //this.getTimy();
  }

  private getHraci() {
    this.server.getAllHrac().then( (resp:any) => {
      this.hraci = resp.map( (hr) => {
        hr.id = hr.HracID;
        hr.odohrane_zapasy = hr.Odohrane_zapasy;
        hr.pocet_vyhier = hr.Pocet_vyhier;
        hr.fotka = hr.Fotka;
        hr.uzivatelID = hr.UzivatelID;

        return hr;
      });
    })
  }

  private getHrac() {
    this.actHrac.id = 5;
    this.server.getHrac(this.actHrac).then( (resp : any) => {
      this.actHrac.odohrane_zapasy = resp[0].Odohrane_zapasy;
      this.actHrac.pocet_vyhier = resp[0].Pocet_vyhier;
      this.actHrac.uzivatelID = resp[0].UzivatelID;

      this.getUzivatel();
    })
  }

  private getUzivatel() {
    //console.log(this.actHrac.uzivatelID)
    this.actUzivatel.id = this.actHrac.uzivatelID;
    this.server.getUzivatel(this.actUzivatel).then( (resp : any) => {
      this.actUzivatel.meno = resp[0].Meno;
      this.actUzivatel.priezvisko = resp[0].Priezvisko;
      this.actUzivatel.vek = resp[0].Vek;
      console.log(resp)
    })
  }

  private getTimy() {
    this.server.getTimByHrac(this.actHrac).then( (resp : any) => {
      this.timy = resp;
    })
  }


}

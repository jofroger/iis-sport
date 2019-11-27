import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Hrac, Tim, Uzivatel } from '../api.structures';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {

  actUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:'', typ:''};
  actHrac: Hrac = {id: null, odohrane_zapasy: '', pocet_vyhier: null, uzivatelID: null};
  timy: Tim[] = [];

  constructor(private server : ApiService) { }

  ngOnInit() {
    this.getHrac();
    this.getTimy();
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
    console.log(this.actHrac.uzivatelID)
    this.actUzivatel.id = this.actHrac.uzivatelID;
    this.server.getUzivatel(this.actUzivatel).then( (resp : any) => {
      this.actUzivatel.meno = resp[0].Meno;
      this.actUzivatel.priezvisko = resp[0].Priezvisko;
      this.actUzivatel.vek = resp[0].Vek;
      console.log(resp)
    })
  }

  private getTimy() {
    /*this.server.getTimByUzivatel(this.actUzivatel).then( (resp : any) => {
      this.timy = resp;
    })*/
  }

}

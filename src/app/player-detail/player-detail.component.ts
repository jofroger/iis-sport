import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Uzivatel, Tim } from '../api.structures';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {

  actUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:''};
  timy: any[] = [];

  constructor(private server : ApiService) { }

  ngOnInit() {
    this.getUzivatel();
    this.getTimy();
  }

  private getUzivatel() {
    this.actUzivatel.id = 5;

    this.server.getUzivatel(this.actUzivatel).then( (resp : any) => {
      this.actUzivatel.meno = resp[0].Meno;
      this.actUzivatel.priezvisko = resp[0].Priezvisko;
      this.actUzivatel.vek = resp[0].Vek;
    })
  }

  private getTimy() {
    this.server.getTimByUzivatel(this.actUzivatel).then( (resp : any) => {
      this.timy = resp;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Tim } from '../api.structures';
import { Zapas } from '../api.structures';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  tim1: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
  tim2: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
  tim3: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
  tim4: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
  tim5: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
  tim6: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
  tim7: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
  tim8: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
  tim9: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
  tim10: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
  tim11: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
  tim12: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
  tim13: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
  tim14: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};


  Zapas1: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: '', turnajID: null, stav_zapasuID: null};
  Zapas2: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: '', turnajID: null, stav_zapasuID: null};
  Zapas3: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: '', turnajID: null, stav_zapasuID: null};
  Zapas4: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: '', turnajID: null, stav_zapasuID: null};
  Zapas5: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: '', turnajID: null, stav_zapasuID: null};
  Zapas6: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: '', turnajID: null, stav_zapasuID: null};

  constructor(private server: ApiService) { }

  ngOnInit() {
    this.loadZapasy();
    this.loadTimy();
  }

  private loadZapasy() {
    for (let i = 1; i <= 6; i++) {
      this['Zapas' + i].id = i;
      this.server.getZapas(this['Zapas' + i]).then( (resp: any) => {
        this['Zapas' + i].nazov = resp[0].Nazov;
        this['Zapas' + i].miesto = resp[0].Miesto;
        this['Zapas' + i].datum = resp[0].Datum;
        this['Zapas' + i].stav = resp[0].Stav;
      });
      this.server.getTimByZapas(this['Zapas' + i]).then( (resp: any) => { // Nastavenie loga timu pri zapasoch
        // tslint:disable-next-line:max-line-length
        (resp[0] !== undefined) ? this['tim' + (i * 2 - 1)].logo = resp[0].Logo : this['tim' + (i * 2 - 1)].logo = '../../assets/image-placeholder.jpg';
        // tslint:disable-next-line:max-line-length
        (resp[1] !== undefined) ? this['tim' + (i * 2)].logo = resp[1].Logo : this['tim' + (i * 2)].logo = '../../assets/image-placeholder.jpg';
        /*this['tim' + i * 2].logo = resp[1].Logo;*/
      });
    }
  }

  private loadTimy() { /*1-14*/
    for (let i = 1; i <= 14; i++) {
      this['tim' + i].id = i;
      this.server.getTim(this['tim' + i]).then( (resp: any) => {
        if (resp.length !== 0) {
          this['tim' + i].nazov = resp[0].Nazov;
          this['tim' + i].logo = resp[0].Logo;
          this['tim' + i].pocet_vyhier = resp[0].Pocet_vyhier;
          this['tim' + i].odohrane_zapasy = resp[0].Odohrane_zapasy;
        } else {
          document.getElementById('team' + i).style.display = 'none';
        }
      });
    }
  }

  private sendTeamNumber(teamNumber) {
    localStorage.setItem('timID', teamNumber);
  }
}

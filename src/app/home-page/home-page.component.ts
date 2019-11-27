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

  tim1: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null};
  tim2: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null};
  tim3: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null};
  tim4: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null};
  tim5: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null};
  tim6: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null};

  Zapas1: Zapas = {id: null, nazov: '', miesto: '', datum: null, turnajID: null};
  Zapas2: Zapas = {id: null, nazov: '', miesto: '', datum: null, turnajID: null};
  Zapas3: Zapas = {id: null, nazov: '', miesto: '', datum: null, turnajID: null};
  Zapas4: Zapas = {id: null, nazov: '', miesto: '', datum: null, turnajID: null};
  Zapas5: Zapas = {id: null, nazov: '', miesto: '', datum: null, turnajID: null};
  Zapas6: Zapas = {id: null, nazov: '', miesto: '', datum: null, turnajID: null};

  constructor(private server: ApiService) { }

  ngOnInit() {
    this.loadZapasy();
    this.loadTimy();
  }

  private loadZapasy() {
    this.Zapas1.id = 1;
    this.Zapas2.id = 2;
    this.Zapas3.id = 3;
    this.Zapas4.id = 4;
    this.Zapas5.id = 5;
    this.Zapas6.id = 6;

    for (let i = 1; i < 7; i++) {
      this.server.getZapas(this['Zapas' + i]).then( (resp: any) => {
          console.log(resp[0]);
          this['Zapas' + i].datum = resp[0].Datum;
          this['Zapas' + i].nazov = resp[0].Nazov;
          this['Zapas' + i].miesto = resp[0].Miesto;
        }
      );
    }
  }

  private loadTimy() {

  }
}

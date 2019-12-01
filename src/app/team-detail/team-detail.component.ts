import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Hrac, Tim, Uzivatel} from '../api.structures';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  tim: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
  hrac1: Hrac = {id: null, odohrane_zapasy: '', pocet_vyhier: null, fotka: '', uzivatelID: null};
  hrac2: Hrac = {id: null, odohrane_zapasy: '', pocet_vyhier: null, fotka: '', uzivatelID: null};
  hrac3: Hrac = {id: null, odohrane_zapasy: '', pocet_vyhier: null, fotka: '', uzivatelID: null};
  hrac4: Hrac = {id: null, odohrane_zapasy: '', pocet_vyhier: null, fotka: '', uzivatelID: null};
  hrac5: Hrac = {id: null, odohrane_zapasy: '', pocet_vyhier: null, fotka: '', uzivatelID: null};
  hrac6: Hrac = {id: null, odohrane_zapasy: '', pocet_vyhier: null, fotka: '', uzivatelID: null};
  uzivatel1: Uzivatel = {id: null, meno: '', priezvisko: '', vek: null, email: '', login: '', heslo: '', typ: ''};
  uzivatel2: Uzivatel = {id: null, meno: '', priezvisko: '', vek: null, email: '', login: '', heslo: '', typ: ''};
  uzivatel3: Uzivatel = {id: null, meno: '', priezvisko: '', vek: null, email: '', login: '', heslo: '', typ: ''};
  uzivatel4: Uzivatel = {id: null, meno: '', priezvisko: '', vek: null, email: '', login: '', heslo: '', typ: ''};
  uzivatel5: Uzivatel = {id: null, meno: '', priezvisko: '', vek: null, email: '', login: '', heslo: '', typ: ''};
  uzivatel6: Uzivatel = {id: null, meno: '', priezvisko: '', vek: null, email: '', login: '', heslo: '', typ: ''};

  constructor(private server: ApiService) { }

  ngOnInit() {
    this.loadTim();
  }

  loadTim() {
    this.tim.id = +localStorage.getItem('timID'); // + je konverzia zo str na int

    this.server.getTim(this.tim).then( (resp: any) => {
      this.tim.nazov = resp[0].Nazov;
      this.tim.logo = resp[0].Logo;
      this.tim.pocet_hracov = resp[0].Pocet_hracov;
      this.tim.odohrane_zapasy = resp[0].Odohrane_zapasy;
      this.tim.pocet_vyhier = resp[0].Pocet_vyhier;

      for (let i = 1; i <= 6; i++) {  // Opakuj pre maximalny pocet zobrazenych hracov
        if (this.tim.pocet_hracov >= i) { // Zviditelni ak tim ma tolko hracov
          document.getElementById('player' + i).style.display = 'block';
          this.server.getHracByTim(this.tim).then( (respons: any) => { // Ziskaj vsetkych hracov timu
            this['hrac' + i].odohrane_zapasy = respons[i - 1].Odohrane_zapasy;
            this['hrac' + i].pocet_vyhier = respons[i - 1].Pocet_vyhier;
            this['hrac' + i].fotka = respons[i - 1].Fotka;
            // tslint:disable-next-line:max-line-length
            (respons[i - 1].Fotka !== undefined) ? this['hrac' + i].fotka = respons[i - 1].Fotka : this['hrac' + i].fotka = '../../assets/image-placeholder.jpg';
            this['uzivatel' + i].id = respons[i - 1].UzivatelID;

            this.server.getUzivatel(this['uzivatel' + i]).then( (response: any) => {
              this['uzivatel' + i].meno = response[0].Meno;
              this['uzivatel' + i].priezvisko = response[0].Priezvisko;
              this['uzivatel' + i].vek = response[0].Vek;
            });
          });
        } else {  // Skry ak tim nema tolko hracov
          document.getElementById('player' + i).style.display = 'none';
        }
      }
    });
  }
}

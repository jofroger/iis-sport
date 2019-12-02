/* tslint:disable:max-line-length */
import { Component, OnInit } from '@angular/core';
import {Stav_zapasu, Tim, Zapas} from '../api.structures';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  tim1: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
  tim2: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};

  Zapas: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: '', vyherca: null, uroven_zapasu: null, turnajID: null};

  stavZapasu1: Stav_zapasu = {id: null, ziskane_sety: null, ziskane_gemy: null, ziskane_vymeny: null, hracID: null, timID: null, zapasID: null};
  stavZapasu2: Stav_zapasu = {id: null, ziskane_sety: null, ziskane_gemy: null, ziskane_vymeny: null, hracID: null, timID: null, zapasID: null};

  constructor(private server: ApiService) { }

  ngOnInit() {
    this.loadZapas();
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async loadZapas() {
    this.Zapas.id = +localStorage.getItem('detailZapasuID');

    this.server.getStav_zapasuByZapas(this.Zapas).then((getStavResp: any) => {
      console.log(getStavResp[0]);
      console.log(getStavResp[1]);
      this.stavZapasu1.ziskane_gemy = getStavResp[0].Ziskane_gemy;
      this.stavZapasu1.ziskane_sety = getStavResp[0].Ziskane_sety;
      this.stavZapasu1.ziskane_vymeny = getStavResp[0].Ziskane_vymeny;
      this.tim1.id = getStavResp[0].TimID;

      this.stavZapasu2.ziskane_gemy = getStavResp[1].Ziskane_gemy;
      this.stavZapasu2.ziskane_sety = getStavResp[1].Ziskane_sety;
      this.stavZapasu2.ziskane_vymeny = getStavResp[1].Ziskane_vymeny;
      this.tim2.id = getStavResp[1].TimID;
    });

    this.server.getZapas(this.Zapas).then((getZapasResp: any) => {
      this.Zapas.nazov = getZapasResp[0].Nazov;
      this.Zapas.miesto = getZapasResp[0].Miesto;
      this.Zapas.datum = getZapasResp[0].Datum;
      this.Zapas.vyherca = getZapasResp[0].Vyherca;
    });

    for (let i = 1; i <= 2; i++) {
      await this.delay(300);  // Nech si hajzlik pocka ked sa predbiehal a potom stazoval, ze this['tim' + i].id je null
      this.server.getTim(this['tim' + i]).then((getTimResp: any) => {
        this['tim' + i].nazov = getTimResp[0].Nazov;
        (getTimResp[0].Logo === undefined) ? this['tim' + i].logo = '../../assets/image-placeholder.jpg' : this['tim' + i].logo = getTimResp[0].Logo;
        this['tim' + i].pocet_hracov = getTimResp[0].Pocet_hracov;
        this['tim' + i].pocet_vyhier = getTimResp[0].Pocet_vyhier;
        this['tim' + i].odohrane_zapasy = getTimResp[0].Odohrane_zapasy;
      });
    }
  }
}

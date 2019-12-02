/* tslint:disable:max-line-length */
import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {Podmienky_turnaja, Turnaj} from '../api.structures';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {

  nazovTurnaja: string;
  nazovTurnajaPlaceholder: string;
  pravidla: number;
  novyZaciatok: Date;
  novyKoniec: Date;
  novaVyhra: string;
  noviSponzori: string;
  novyPovrch: string;

  Turnaj: Turnaj = {id: null, nazov: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, uzivatelID: null};
  podmienkyTurnaja: Podmienky_turnaja = {id: null, minimalny_vek_hracov: null, pocet_hracov_v_tyme: null, pocet_tymov: null, registracny_poplatok: '', druh_hry: ''};

  pravidlaControl = new FormControl('');
  nazovControl = new FormControl('');

  turnajExists: Boolean;


  constructor(private server: ApiService, private router: Router) { }

  ngOnInit() {
    this.Turnaj.id = +localStorage.getItem('detailTurnajaID');
    this.server.getTurnaj(this.Turnaj).then( (resp: any) => {
      (resp[0] !== undefined) ? this.turnajExists = true : this.turnajExists = false;
    });

    this.pravidla = 1;
    this.loadPodmienkyTurnaja();
    this.loadTournamentData();
  }

  private loadTournamentData() {
    this.server.getTurnaj(this.Turnaj).then( (resp: any) => {
      console.log(this.Turnaj.nazov === '');
      (this.Turnaj.nazov === '') ? this.nazovTurnajaPlaceholder = 'Nazov turnaja' : this.nazovTurnajaPlaceholder = this.Turnaj.nazov.toString();
      (resp[0].Nazov !== undefined) ? this.Turnaj.nazov = resp[0].Nazov : this.Turnaj.nazov = '';
      (resp[0].Zaciatok !== undefined) ? this.Turnaj.zaciatok = resp[0].Zaciatok : this.Turnaj.zaciatok = null;
      (resp[0].Koniec !== undefined) ? this.Turnaj.koniec = resp[0].Koniec : this.Turnaj.koniec = null;
      (resp[0].Vyhra !== undefined) ? this.Turnaj.vyhra = resp[0].Vyhra : this.Turnaj.vyhra = '';
      (resp[0].Sponzori !== undefined) ? this.Turnaj.sponzori = resp[0].Sponzori : this.Turnaj.sponzori = '';
      (resp[0].Povrch !== undefined) ? this.Turnaj.povrch = resp[0].Povrch : this.Turnaj.povrch = '';
      (resp[0].Podmienky_turnajaID !== undefined) ? this.Turnaj.nazov = resp[0].Nazov : this.Turnaj.nazov = '';
    });
  }

  loadPodmienkyTurnaja() {
    (this.Turnaj.podmienky_turnajaID === null) ? this.podmienkyTurnaja.id = +this.pravidla : this.podmienkyTurnaja.id = this.Turnaj.podmienky_turnajaID;
    this.server.getPodmienky_turnaja(this.podmienkyTurnaja).then( (podmienkyTurnajaResp: any) => {
      if (podmienkyTurnajaResp[0] !== undefined) {
        this.podmienkyTurnaja.minimalny_vek_hracov = podmienkyTurnajaResp[0].Minimalny_vek_hracov;
        this.podmienkyTurnaja.pocet_hracov_v_tyme = podmienkyTurnajaResp[0].Pocet_hracov_v_tyme;
        this.podmienkyTurnaja.pocet_tymov = podmienkyTurnajaResp[0].Pocet_tymov;
        this.podmienkyTurnaja.registracny_poplatok = podmienkyTurnajaResp[0].Registracny_poplatok;
        this.podmienkyTurnaja.druh_hry = podmienkyTurnajaResp[0].Druh_hry;
      }
    });
  }


  save() {
    this.Turnaj.nazov = this.nazovTurnaja;
    this.Turnaj.podmienky_turnajaID = this.pravidla;
    this.Turnaj.zaciatok = this.novyZaciatok;
    this.Turnaj.koniec = this.novyKoniec;
    this.Turnaj.vyhra = this.novaVyhra;
    this.Turnaj.sponzori = this.noviSponzori;
    this.Turnaj.povrch = this.novyPovrch;
    this.Turnaj.uzivatelID = +localStorage.getItem('userId');
    (!this.turnajExists) ? this.server.createTurnaj(this.Turnaj) : this.server.updateTurnaj(this.Turnaj);
  }

  goBack() {
    this.router.navigate(['my-tournaments']);
  }

}

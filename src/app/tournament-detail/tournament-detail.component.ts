/* tslint:disable:max-line-length */
import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {Hrac, Podmienky_turnaja, Turnaj, Uzivatel} from '../api.structures';
import {FormBuilder, FormControl} from '@angular/forms';


@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {

  books = [
    { author: 'D. Adams', title: 'The Hitchhiker\'s Guide to the Galaxy', year: 1979, genre: 'Comedy, sci-fi' },
    { author: 'K. Vonnegut', title: 'Cat\'s Cradle', year: 1963, genre: 'Satire, sci-fi' },
    { author: 'M. Mitchell', title: 'Gone with the Wind', year: 1936, genre: 'Historical fiction' }
  ];

  turnaj: Turnaj = {id: null, nazov: '', stav_turnaja: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, usporiadatelID: null};
  turnaje: Turnaj[] = [];
  turnajeReadOnly: Turnaj[] = [];
  actualUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo: '', typ: ''};



  // nazovTurnaja: string;
  // nazovTurnajaPlaceholder: string;
  // pravidla: number;
  // novyZaciatok: Date;
  // novyKoniec: Date;
  // novaVyhra: string;
  // noviSponzori: string;
  // novyPovrch: string;
  //
  // Turnaj: Turnaj = {id: null, nazov: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, uzivatelID: null};
  // podmienkyTurnaja: Podmienky_turnaja = {id: null, minimalny_vek_hracov: null, pocet_hracov_v_tyme: null, pocet_tymov: null, registracny_poplatok: '', druh_hry: ''};
  //
  // pravidlaControl = new FormControl('');
  // nazovControl = new FormControl('');
  //
  // turnajExists: Boolean;


  constructor(private server: ApiService, private router: Router) { }

  ngOnInit() {

    this.getVsetkyTurnaje();
    // this.Turnaj.id = +localStorage.getItem('detailTurnajaID');
    // this.server.getTurnaj(this.Turnaj).then( (resp: any) => {
    //   (resp[0] !== undefined) ? this.turnajExists = true : this.turnajExists = false;
    // });
    //
    // this.pravidla = 1;
    // this.loadPodmienkyTurnaja();
    // this.loadTournamentData();
  }



  getVsetkyTurnaje() {
    const UserID: string = localStorage.getItem('userId');
    this.actualUzivatel.id = +UserID;
    console.log('UzivatelID', this.actualUzivatel.id);
    this.server.getTurnajByUzivatel(this.actualUzivatel).then( (resp: any) => {

      this.turnaje = resp.map( (tu) => {
          tu.id = tu.TurnajID;
          tu.nazov = tu.Nazov;
          tu.zaciatok = tu.Zaciatok;
          tu.koniec = tu.Koniec;
          tu.vyhra = tu.Vyhra;
          tu.sponzori = tu.Sponzori;
          tu.povrch = tu.Povrch;
          tu.podmienky_turnajaID = tu.Podmienky_turnajaID;
          tu.usporiadatelID = tu.UsporiadatelID;
          return tu;
      });
    });

    this.server.getTurnajExceptUzivatel(this.actualUzivatel).then( (resp: any) => {

        this.turnajeReadOnly = resp.map( (tu) => {
            tu.id = tu.TurnajID;
            tu.nazov = tu.Nazov;
            tu.zaciatok = tu.Zaciatok;
            tu.koniec = tu.Koniec;
            tu.vyhra = tu.Vyhra;
            tu.sponzori = tu.Sponzori;
            tu.povrch = tu.Povrch;
            tu.podmienky_turnajaID = tu.Podmienky_turnajaID;
            tu.usporiadatelID = tu.UsporiadatelID;
            return tu;
        });

        console.log(this.turnaje);
    });


  }


  createNewTurnaj(event) {
    const newturnaj: Turnaj = {id: null,
                               nazov: event.data.nazov,
                               stav_turnaja: event.data.stav_turnaja, 
                               zaciatok: event.data.zaciatok,
                               koniec: event.data.koniec,
                               vyhra: event.data.vyhra,
                               sponzori: event.data.sponzori,
                               povrch: event.data.povrch,
                               podmienky_turnajaID : event.data.podmienky_turnajaID,
                               usporiadatelID: event.data.usporiadatelID};



    this.server.createTurnaj(newturnaj).then(() => {
      this.getVsetkyTurnaje();
    });

  }



  // private loadTournamentData() {
  //   this.server.getTurnaj(this.Turnaj).then( (resp: any) => {
  //     console.log(this.Turnaj.nazov === '');
  //     (this.Turnaj.nazov === '') ? this.nazovTurnajaPlaceholder = 'Nazov turnaja' : this.nazovTurnajaPlaceholder = this.Turnaj.nazov.toString();
  //     (resp[0].Nazov !== undefined) ? this.Turnaj.nazov = resp[0].Nazov : this.Turnaj.nazov = '';
  //     (resp[0].Zaciatok !== undefined) ? this.Turnaj.zaciatok = resp[0].Zaciatok : this.Turnaj.zaciatok = null;
  //     (resp[0].Koniec !== undefined) ? this.Turnaj.koniec = resp[0].Koniec : this.Turnaj.koniec = null;
  //     (resp[0].Vyhra !== undefined) ? this.Turnaj.vyhra = resp[0].Vyhra : this.Turnaj.vyhra = '';
  //     (resp[0].Sponzori !== undefined) ? this.Turnaj.sponzori = resp[0].Sponzori : this.Turnaj.sponzori = '';
  //     (resp[0].Povrch !== undefined) ? this.Turnaj.povrch = resp[0].Povrch : this.Turnaj.povrch = '';
  //     (resp[0].Podmienky_turnajaID !== undefined) ? this.Turnaj.nazov = resp[0].Nazov : this.Turnaj.nazov = '';
  //   });
  // }
  //
  // loadPodmienkyTurnaja() {
  //   (this.Turnaj.podmienky_turnajaID === null) ? this.podmienkyTurnaja.id = +this.pravidla : this.podmienkyTurnaja.id = this.Turnaj.podmienky_turnajaID;
  //   this.server.getPodmienky_turnaja(this.podmienkyTurnaja).then( (podmienkyTurnajaResp: any) => {
  //     if (podmienkyTurnajaResp[0] !== undefined) {
  //       this.podmienkyTurnaja.minimalny_vek_hracov = podmienkyTurnajaResp[0].Minimalny_vek_hracov;
  //       this.podmienkyTurnaja.pocet_hracov_v_tyme = podmienkyTurnajaResp[0].Pocet_hracov_v_tyme;
  //       this.podmienkyTurnaja.pocet_tymov = podmienkyTurnajaResp[0].Pocet_tymov;
  //       this.podmienkyTurnaja.registracny_poplatok = podmienkyTurnajaResp[0].Registracny_poplatok;
  //       this.podmienkyTurnaja.druh_hry = podmienkyTurnajaResp[0].Druh_hry;
  //     }
  //   });
  // }
  //
  //
  // save() {
  //   this.Turnaj.nazov = this.nazovTurnaja;
  //   this.Turnaj.podmienky_turnajaID = this.pravidla;
  //   this.Turnaj.zaciatok = this.novyZaciatok;
  //   this.Turnaj.koniec = this.novyKoniec;
  //   this.Turnaj.vyhra = this.novaVyhra;
  //   this.Turnaj.sponzori = this.noviSponzori;
  //   this.Turnaj.povrch = this.novyPovrch;
  //   this.Turnaj.uzivatelID = +localStorage.getItem('userId');
  //   (!this.turnajExists) ? this.server.createTurnaj(this.Turnaj) : this.server.updateTurnaj(this.Turnaj);
  // }
  //
  // goBack() {
  //   this.router.navigate(['my-tournaments']);
  // }

}

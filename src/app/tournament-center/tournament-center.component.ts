/* tslint:disable:max-line-length */
import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Turnaj, Usporiadatel} from '../api.structures';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tournament-center',
  templateUrl: './tournament-center.component.html',
  styleUrls: ['./tournament-center.component.css']
})
export class TournamentCenterComponent implements OnInit {

  usporiadatel: Usporiadatel = {id: null, organizacia: '', uzivatelID: null};

  Turnaj1: Turnaj = {id: null, nazov: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, uzivatelID: null};
  Turnaj2: Turnaj = {id: null, nazov: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, uzivatelID: null};
  Turnaj3: Turnaj = {id: null, nazov: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, uzivatelID: null};
  Turnaj4: Turnaj = {id: null, nazov: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, uzivatelID: null};
  Turnaj5: Turnaj = {id: null, nazov: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, uzivatelID: null};
  Turnaj6: Turnaj = {id: null, nazov: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, uzivatelID: null};

  constructor(private server: ApiService, private router: Router) { }

  ngOnInit() {
    localStorage.setItem('turnajOffset', '0');
    this.usporiadatel.uzivatelID = +localStorage.getItem('userId');
    this.server.getTurnajByUsporiadatel(this.usporiadatel).then( (resp: any) => {  // Zistenie poctu zapasov pre obmedzenie nacitaviania po stlaceni sipky
      localStorage.setItem('pocetTurnajov', resp.length);
    });
    this.loadTurnaje();
  }

  private loadTurnaje() {
    const turnajOffset = +localStorage.getItem('turnajOffset');
    const imin = 1 + turnajOffset;
    const imax = 6 + turnajOffset;
    this.server.getTurnajByUsporiadatel(this.usporiadatel).then( (resp: any) => {
      for (let i = imin; i <= imax; i++) {
        console.log(resp[i - 1]);
        if (resp[i - 1] !== undefined) {
          document.getElementById('turnaj' + (i - turnajOffset)).style.display = 'block';
          this['Turnaj' + (i - turnajOffset)].nazov = resp[i - 1].Nazov;
          this['Turnaj' + (i - turnajOffset)].zaciatok = resp[i - 1].Zaciatok;
          this['Turnaj' + (i - turnajOffset)].koniec = resp[i - 1].Koniec;
          this['Turnaj' + (i - turnajOffset)].vyhra = resp[i - 1].Vyhra;
        } else {
          this['Turnaj' + (i - turnajOffset)].nazov = 'Pridať turnaj';
          this['Turnaj' + (i - turnajOffset)].vyhra = '-';
        }
      }
    });
  }

  loadPreviousTurnaje() {}

  loadNextTurnaje() {}

  gotoDetailTurnaja(turnajID) {
    localStorage.setItem('detailTurnajaID', turnajID);
    this.router.navigate(['tournament-detail']);
  }
}

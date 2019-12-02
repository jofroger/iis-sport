/* tslint:disable:max-line-length */
import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Turnaj} from '../api.structures';

@Component({
  selector: 'app-tournament-center',
  templateUrl: './tournament-center.component.html',
  styleUrls: ['./tournament-center.component.css']
})
export class TournamentCenterComponent implements OnInit {

  Turnaj1: Turnaj = {id: null, nazov: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, uzivatelID: null};
  Turnaj2: Turnaj = {id: null, nazov: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, uzivatelID: null};
  Turnaj3: Turnaj = {id: null, nazov: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, uzivatelID: null};
  Turnaj4: Turnaj = {id: null, nazov: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, uzivatelID: null};
  Turnaj5: Turnaj = {id: null, nazov: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, uzivatelID: null};
  Turnaj6: Turnaj = {id: null, nazov: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, uzivatelID: null};

  constructor(private server: ApiService) { }

  ngOnInit() {
    localStorage.setItem('turnajOffset', '0');
    this.server.getAllTurnajeByUsporiadatel().then( (resp: any) => {  // Zistenie poctu zapasov pre obmedzenie nacitaviania po stlaceni sipky
      localStorage.setItem('pocetTurnajov', resp.length);
    });
    this.loadTurnaje();
  }

  private loadTurnaje() {
    const turnajOffset = +localStorage.getItem('turnajOffset');
    const imin = 1 + zapasOffset;
    const imax = 6 + zapasOffset;
    for (let i = imin; i <= imax; i++) {
      this['Turnaj' + (i - zapasOffset)].id = i;
      this.server.getAllTurnajByUsporiadatel(this['Zapas' + (i - zapasOffset)]).then( (resp: any) => {
        if (resp.length !== 0) {
          document.getElementById('zapas' + (i - zapasOffset)).style.display = 'block';
          this['Zapas' + (i - zapasOffset)].nazov = resp[0].Nazov;
          this['Zapas' + (i - zapasOffset)].miesto = resp[0].Miesto;
          this['Zapas' + (i - zapasOffset)].datum = resp[0].Datum;

          if (resp[0].Stav === 'planovany') {
            this['stavZapasu' + ((i - zapasOffset) * 2 - 1)].ziskane_sety = 'x';
            this['stavZapasu' + ((i - zapasOffset) * 2 - 1)].ziskane_gemy = 'x';
            this['stavZapasu' + ((i - zapasOffset) * 2)].ziskane_sety = 'x';
            this['stavZapasu' + ((i - zapasOffset) * 2)].ziskane_gemy = 'x';
          } else {
            this.server.getStav_zapasuByZapas(this['Zapas' + i]).then( (resp: any) => {
              this['stavZapasu' + ((i - zapasOffset) * 2 - 1)].ziskane_sety = resp[0].Ziskane_sety;
              this['stavZapasu' + ((i - zapasOffset) * 2 - 1)].ziskane_gemy = resp[0].Ziskane_gemy;
              this['stavZapasu' + ((i - zapasOffset) * 2)].ziskane_sety = resp[1].Ziskane_sety;
              this['stavZapasu' + ((i - zapasOffset) * 2)].ziskane_gemy = resp[1].Ziskane_gemy;
            });
          }
        } else {
          document.getElementById('zapas' + (i - zapasOffset)).style.display = 'none';
        }
      });
      this.server.getTimByZapas(this['Zapas' + (i - zapasOffset)]).then( (resp: any) => { // Nastavenie loga timu pri zapasoch
        // tslint:disable-next-line:max-line-length
        (resp[0] !== undefined) ? this['tim' + ((i - zapasOffset) * 2 - 1)].logo = resp[0].Logo : this['tim' + ((i - zapasOffset) * 2 - 1)].logo = '../../assets/image-placeholder.jpg';
        // tslint:disable-next-line:max-line-length
        (resp[1] !== undefined) ? this['tim' + ((i - zapasOffset) * 2)].logo = resp[1].Logo : this['tim' + ((i - zapasOffset) * 2)].logo = '../../assets/image-placeholder.jpg';
        /*this['tim' + i * 2].logo = resp[1].Logo;*/
      });
    }
  }

}

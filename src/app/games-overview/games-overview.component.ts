import { Component, OnInit } from '@angular/core';
import {Tim, Zapas} from '../api.structures';
import {ApiService} from '../api.service';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-games-overview',
  templateUrl: './games-overview.component.html',
  styleUrls: ['./games-overview.component.css']
})
export class GamesOverviewComponent implements OnInit {
  /*public value: Date [] = [new Date ("06/14/2019"), new Date ("06/21/2019"), new Date ("06/28/2019"), new Date ("07/05/2019")]
  public multiselect: Boolean = true;*/
  public minDate: Date = new Date ('06/01/2019');
  public maxDate: Date = new Date ('12/31/2020');
  public value: Date = new Date ('12/01/2019');

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

  Zapas1: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: '', vyherca: null, uroven_zapasu: null, turnajID: null};
  Zapas2: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: '', vyherca: null, uroven_zapasu: null, turnajID: null};
  Zapas3: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: '', vyherca: null, uroven_zapasu: null, turnajID: null};
  Zapas4: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: '', vyherca: null, uroven_zapasu: null, turnajID: null};
  Zapas5: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: '', vyherca: null, uroven_zapasu: null, turnajID: null};
  Zapas6: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: '', vyherca: null, uroven_zapasu: null, turnajID: null};

  constructor(private server: ApiService) { }

  ngOnInit() {
    localStorage.setItem('zapasOffset', '0');
    this.server.getAllZapas().then( (resp: any) => {  // Zistenie poctu zapasov pre obmedzenie nacitaviania po stlaceni sipky
      localStorage.setItem('pocetZapasov', resp.length);
    });
    this.loadZapasy();
  }

  private loadZapasy() {
    const zapasOffset = +localStorage.getItem('zapasOffset');
    console.log('zapasOffset ' + zapasOffset);
    const imin = 1 + zapasOffset;
    console.log('imin ' + imin);
    const imax = 6 + zapasOffset;
    console.log('imax ' + imax);
    for (let i = imin; i <= imax; i++) {
      this['Zapas' + (i - zapasOffset)].id = i;
      this.server.getZapas(this['Zapas' + (i - zapasOffset)]).then( (resp: any) => {
        if (resp.length !== 0) {
          document.getElementById('zapas' + (i - zapasOffset)).style.display = 'block';
          this['Zapas' + (i - zapasOffset)].nazov = resp[0].Nazov;
          this['Zapas' + (i - zapasOffset)].miesto = resp[0].Miesto;
          this['Zapas' + (i - zapasOffset)].datum = resp[0].Datum;
          this['Zapas' + (i - zapasOffset)].stav = resp[0].Stav;
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

  private loadPreviousZapasy() {
    let zapasOffset = +localStorage.getItem('zapasOffset');
    (zapasOffset !== 0) ? zapasOffset = zapasOffset - 6 : zapasOffset = zapasOffset;
    localStorage.setItem('zapasOffset', zapasOffset.toString());
    this.loadZapasy();
  }

  private loadNextZapasy() {
    let zapasOffset = +localStorage.getItem('zapasOffset');
    const pocetZapasov = +localStorage.getItem('pocetZapasov');
    (zapasOffset >= (pocetZapasov - 6)) ? zapasOffset = zapasOffset : zapasOffset = zapasOffset + 6;
    localStorage.setItem('zapasOffset', zapasOffset.toString());
    this.loadZapasy();
  }
}

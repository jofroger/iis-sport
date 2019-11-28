import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import { Tim } from '../api.structures';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  tim: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};

  constructor(private server: ApiService) { }

  ngOnInit() {
    this.loadTim();
  }

  loadTim() {
    this.tim.id = 4;
    this.server.getTim(this.tim).then( (resp: any) => {
      this.tim.nazov = resp[0].Nazov;
      this.tim.logo = resp[0].Logo;
      this.tim.pocet_hracov = resp[0].Pocet_hracov;
      this.tim.odohrane_zapasy = resp[0].Odohrane_zapasy;
      this.tim.pocet_vyhier = resp[0].Pocet_vyhier;
      switch (this.tim.pocet_hracov) {  /* TODO Prerobit na if-immediate (this.tim.pocet_hracov < 1 atd.)*/
        case 0: {
          document.getElementById('player1').style.display = 'none';
          document.getElementById('player2').style.display = 'none';
          document.getElementById('player3').style.display = 'none';
          document.getElementById('player4').style.display = 'none';
          document.getElementById('player5').style.display = 'none';
          document.getElementById('player6').style.display = 'none';
          break;
        }
        case 1: {
          document.getElementById('player1').style.display = 'block';
          document.getElementById('player2').style.display = 'none';
          document.getElementById('player3').style.display = 'none';
          document.getElementById('player4').style.display = 'none';
          document.getElementById('player5').style.display = 'none';
          document.getElementById('player6').style.display = 'none';
          break;
        }
        case 2: {
          document.getElementById('player1').style.display = 'block';
          document.getElementById('player2').style.display = 'block';
          document.getElementById('player3').style.display = 'none';
          document.getElementById('player4').style.display = 'none';
          document.getElementById('player5').style.display = 'none';
          document.getElementById('player6').style.display = 'none';
          break;
        }
        case 3: {
          document.getElementById('player1').style.display = 'block';
          document.getElementById('player2').style.display = 'block';
          document.getElementById('player3').style.display = 'block';
          document.getElementById('player4').style.display = 'none';
          document.getElementById('player5').style.display = 'none';
          document.getElementById('player6').style.display = 'none';
          break;
        }
        case 4: {
          document.getElementById('player1').style.display = 'block';
          document.getElementById('player2').style.display = 'block';
          document.getElementById('player3').style.display = 'block';
          document.getElementById('player4').style.display = 'block';
          document.getElementById('player5').style.display = 'none';
          document.getElementById('player6').style.display = 'none';
          break;
        }
        case 5: {
          document.getElementById('player1').style.display = 'block';
          document.getElementById('player2').style.display = 'block';
          document.getElementById('player3').style.display = 'block';
          document.getElementById('player4').style.display = 'block';
          document.getElementById('player5').style.display = 'block';
          document.getElementById('player6').style.display = 'none';
          break;
        }
        case 6: {
          document.getElementById('player1').style.display = 'block';
          document.getElementById('player2').style.display = 'block';
          document.getElementById('player3').style.display = 'block';
          document.getElementById('player4').style.display = 'block';
          document.getElementById('player5').style.display = 'block';
          document.getElementById('player6').style.display = 'block';
          break;
        }
      }
    });
  }
}

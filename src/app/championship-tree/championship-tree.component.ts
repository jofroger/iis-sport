import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Stav_zapasu, Tim, Turnaj, Usporiadatel, Zapas, Podmienky_turnaja} from '../api.structures';
import * as Collections from 'typescript-collections';
import * as binarySearchTree from '@datastructures-js/binary-search-tree';
import { FileSelectDirective } from 'ng2-file-upload';

interface TreeBox {
    nazov: String
    score: Number
}

@Component({
  selector: 'app-championship-tree',
  templateUrl: './championship-tree.component.html',
  styleUrls: ['./championship-tree.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ChampionshipTreeComponent implements OnInit {
  index : any = 0;

  actZapas: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: null, vyherca: null, uroven_zapasu: null, turnajID: null};
  zapasy: Zapas[] = [];
  
  actTurnaj: Turnaj = {id: null, nazov:'', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID: null, uzivatelID: null};
  turnaje: Turnaj[] = [];

  zapasyUroven1 : Zapas[] = [];
  zapasyUroven2 : Zapas[] = [];
  zapasyUroven3 : Zapas[] = [];

  boxyUroven1 : TreeBox[] = new Array<TreeBox>(8);
  boxyUroven2 : TreeBox[] = new Array<TreeBox>(4);
  boxyUroven3 : TreeBox = {nazov:'', score: null};

  constructor(private router: Router, private server: ApiService) { }

  ngOnInit() {
    this.getTurnaje();
  }

  getTurnaje() {
    this.server.getAllTurnaj().then( (resp:any) => {
      this.turnaje = resp.map( (tu) => {
        tu.id = tu.TurnajID;
        tu.nazov = tu.Nazov;
        tu.zaciatok = tu.Zaciatok; 
        tu.koniec = tu.Koniec;
        tu.vyhra = tu.Vyhra;
        tu.sponzori = tu.Sponzori;
        tu.povrch = tu.Povrch;
        tu.podmienky_turnajaID = tu.Podmienky_turnajaID;
        tu.uzivatelID = tu.UzivatelID;
        return tu;
      })
      
      this.setActTurnaj(this.index);
    })
  }

  setActTurnaj(idx) {
    this.index = idx;
    this.actTurnaj = this.turnaje[this.index];
    this.fillTree();
  }

  fillTree() {
    this.getZapasyByUroven();
    //this.fillUrovne();
  }

  getZapasyByUroven() {
    this.server.getZapasByTurnajAndUroven(this.actTurnaj, 1).then( (resp:any) => {
      this.zapasyUroven1 = resp.map( (za) => {
          za.id = za.ZapasID;
          za.nazov = za.Nazov;
          za.miesto = za.Miesto;
          za.datum = za.Datum;
          za.stav = za.Stav;
          za.vyherca = za.Vyherca;
          za.uroven_zapasu = za.Uroven_zapasu;
          za.turnajID = za.TurnajID;
          return za;
        });

        this.fillUrovne();
    });

    this.server.getZapasByTurnajAndUroven(this.actTurnaj, 2).then( (resp:any) => {
      this.zapasyUroven2 = resp.map( (za) => {
          za.id = za.ZapasID;
          za.nazov = za.Nazov;
          za.miesto = za.Miesto;
          za.datum = za.Datum;
          za.stav = za.Stav;
          za.vyherca = za.Vyherca;
          za.uroven_zapasu = za.Uroven_zapasu;
          za.turnajID = za.TurnajID;
          return za;
        });
    });

    this.server.getZapasByTurnajAndUroven(this.actTurnaj, 3).then( (resp:any) => {
      this.zapasyUroven3 = resp.map( (za) => {
          za.id = za.ZapasID;
          za.nazov = za.Nazov;
          za.miesto = za.Miesto;
          za.datum = za.Datum;
          za.stav = za.Stav;
          za.vyherca = za.Vyherca;
          za.uroven_zapasu = za.Uroven_zapasu;
          za.turnajID = za.TurnajID;
          return za;
        });
    });
  }

  fillUrovne() {
    let podm: Podmienky_turnaja = {
      id: this.actTurnaj.podmienky_turnajaID,
      minimalny_vek_hracov: null,
      pocet_hracov_v_tyme: null,
      pocet_tymov: null,
      registracny_poplatok: '',
      druh_hry: ''
    }

    this.server.getPodmienky_turnaja(podm).then( (resp:any) => {
      podm.pocet_hracov_v_tyme = resp[0].Pocet_hracov_v_tyme;

      if (podm.pocet_hracov_v_tyme === 1) {
        let boxIdx = 0;
        for (let i = 0; i < this.zapasyUroven1.length; i++) {
          this.server.getUzivatelByZapas(this.zapasyUroven1[i]).then( (resp:any) => {
            this.boxyUroven1[boxIdx++].nazov = resp[0].Meno + resp[0].Priezvisko;
            this.boxyUroven1[boxIdx++].nazov = resp[1].Meno + resp[1].Priezvisko;
          })
        }
        console.log(this.boxyUroven1);
      }
      else {

      }
    })
  }
}





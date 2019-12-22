/* tslint:disable:max-line-length */
import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {Hrac, Podmienky_turnaja, Turnaj, Usporiadatel, Uzivatel, Zapas} from '../api.structures';
import {FormBuilder, FormControl} from '@angular/forms';


export interface IUsporadatelia {
  id: string;
  nazov: string;
}

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {

  turnaj: Turnaj = {id: null, nazov: '', stav_turnaja: '', zaciatok: null, koniec: null, vyhra: '', sponzori: '', povrch: '', podmienky_turnajaID : null, usporiadatelID: null};
  turnaje: Turnaj[] = [];
  turnajeReadOnly: Turnaj[] = [];
  actualUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo: '', typ: ''};
  actualPodmienTurnaja: Podmienky_turnaja = {id: null, minimalny_vek_hracov: null, pocet_hracov_v_tyme: null, pocet_tymov: null, registracny_poplatok: '', druh_hry: ''};

  newPodmienTurnaja: Podmienky_turnaja = {id: null, minimalny_vek_hracov: null, pocet_hracov_v_tyme: null, pocet_tymov: null, registracny_poplatok: '', druh_hry: ''};
  newUsporiadatel:  Usporiadatel = {id: null, organizacia: '', uzivatelID: null};



  actualUsporiatel: IUsporadatelia[] = [];

  regPoplatok: string;
  pocetTymov: number;
  pocetHracVTyme: number;
  minVek: number;

  hraKlasicka: boolean;
  hraZmiesana: boolean;

  hraPlanovana: boolean;
  hraPrebieha: boolean;
  hraUkoncena: boolean;

  eventSaveError: boolean = false;
  eventSaveError_expect4or8tymov: boolean = false;;
  eventSave: any;

  rowClick_PodmienTurnajaId: number;


  //warning boolean
  ErrorMsg_Nazov: boolean = false;
  ErrorMsg_StavTurnaja: boolean = false;
  ErrorMsg_Zaciatok: boolean = false;
  ErrorMsg_Koniec: boolean = false;
  ErrorMsg_KoniecSkorAkoZaciatok: boolean = false;
  ErrorMsg_Vyhra: boolean = false;
  ErrorMsg_Povrch: boolean = false;
  ErrorMsg_ZaporVyhra: boolean = false;



  constructor(private server: ApiService, private router: Router) { }



  ngOnInit() {
    this.getVsetkyTurnaje();
    // this.ziskatUsporiadatelov();
  }


  ziskatUsporiadatelov(){
    const UserID: string = localStorage.getItem('userId');
    this.actualUzivatel.id = +UserID;
    let i=0;
    this.server.getUsporiadatelByUzivatel(this.actualUzivatel).then( (resp: any) => {
      this.actualUsporiatel[i].id =   resp.UsporiadatelId;
      this.actualUsporiatel[i].nazov = resp.Organizacia;

    })

  }




  InitButtons(){
    this.hraKlasicka = false;
    this.hraZmiesana = false;

    this.hraPlanovana = false;
    this.hraPrebieha = false;
    this.hraUkoncena = false;

  }

  rowClick(event){
    console.log(event);
    this.eventSave = event;

    this.rowClick_PodmienTurnajaId = event.data.podmienky_turnajaID;

    this.actualPodmienTurnaja.id = event.data.podmienky_turnajaID;

    this.server.getPodmienky_turnaja(this.actualPodmienTurnaja).then( (resp: any) => {

      this.actualPodmienTurnaja = resp.map( (tu) => {

        tu.id = tu.Podmienky_turnajaID;
        tu.minimalny_vek_hracov = tu.Minimalny_vek_hracov;
        tu.pocet_hracov = tu.Pocet_hracov;
        tu.pocet_tymov = tu.Pocet_tymov;
        tu.registracny_poplatok = tu.Registracny_poplatok;
        tu.druh_hry = tu.Druh_hry;

        this.regPoplatok = tu.Registracny_poplatok;
        this.pocetTymov = tu.Pocet_tymov;
        this.pocetHracVTyme = tu.Pocet_hracov_v_tyme;
        this.minVek = tu.Minimalny_vek_hracov;

        this.InitButtons();

        if (tu.Druh_hry === "klasicka"){
          this.hraKlasicka = true;
          this.hraZmiesana = false;
        } else if (tu.Druh_hry === "zmiesana"){
          this.hraKlasicka = false;
          this.hraZmiesana = true;
        }

        if (event.data.Stav_turnaja === "planovany"){
          this.hraPlanovana = true;
          this.hraPrebieha = false;
          this.hraUkoncena = false;
        } else if  (event.data.Stav_turnaja === "prebieha"){
          this.hraPlanovana = false;
          this.hraPrebieha = true;
          this.hraUkoncena = false;
        } else  if (event.data.Stav_turnaja === "ukonceny"){
          this.hraPlanovana = false;
          this.hraPrebieha = false;
          this.hraUkoncena = true;
        }
        return tu;
      });
    });


  }

  getVsetkyTurnaje() {
    const UserID: string = localStorage.getItem('userId');
    this.actualUzivatel.id = +UserID;
    this.server.getTurnajByUzivatel(this.actualUzivatel).then( (resp: any) => {

      this.turnaje = resp.map( (tu) => {
          tu.id = tu.TurnajID;
          tu.stav_turnaja = tu.Stav_turnaja;
          tu.nazov = tu.Nazov;
          tu.zaciatok = tu.Zaciatok.substring(0, 10);
          tu.koniec = tu.Koniec.substring(0, 10);
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
            tu.stav_turnaja = tu.Stav_turnaja;
            tu.nazov = tu.Nazov;
            tu.zaciatok = tu.Zaciatok.substring(0, 10);
            tu.koniec = tu.Koniec.substring(0, 10);
            tu.vyhra = tu.Vyhra;
            tu.sponzori = tu.Sponzori;
            tu.povrch = tu.Povrch;
            tu.podmienky_turnajaID = tu.Podmienky_turnajaID;
            tu.usporiadatelID = tu.UsporiadatelID;
            return tu;
        });

    });


  }

  isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === dateString;
  }

  dataValidation(event){

    if(event.data.nazov === ""){
      this.ErrorMsg_Nazov = true;
      return false;
    }
    if(event.data.zaciatok === ""){
      this.ErrorMsg_Zaciatok = true;
      return false;
    }
    if(event.data.koniec === ""){
      this.ErrorMsg_Koniec = true;
      return false;
    }
    if(event.data.vyhra === ""){
      this.ErrorMsg_Vyhra = true;
      return false;
    }
    if(event.data.povrch === ""){
      this.ErrorMsg_Povrch = true;
      return false;
    }


    let intVyhra = +event.data.vyhra;
    if (intVyhra < 0 ){
      this.ErrorMsg_ZaporVyhra = true;
      return false;
    }

    if (!this.isValidDate(event.data.zaciatok)){
      this.ErrorMsg_Zaciatok = true;
    }

    if (!this.isValidDate(event.data.koniec)){
      this.ErrorMsg_Koniec = true;
      return false;
    }

    const dateZaciatok = new Date(event.data.zaciatok);
    const dateKoniec = new Date(event.data.koniec);

    if ( dateZaciatok > dateKoniec ){
      this.ErrorMsg_KoniecSkorAkoZaciatok = true;
      return false;
    }



  }

  createNewTurnaj(event) {

    console.log(event);
    let check: boolean;
    check = this.dataValidation(event);
    if (check === false) {
      return
    }




    this.server.createPodmienky_turnaja(this.newPodmienTurnaja).then((respPodmienTurnaja: any) => {



      //vytvorenie noveho usporiadatela
      this.newUsporiadatel.id = null;
      this.newUsporiadatel.organizacia = "Monopol";
      const UserID: string = localStorage.getItem('userId');
      this.newUsporiadatel.uzivatelID = +UserID;
      this.server.createUsporiadatel(this.newUsporiadatel).then((respUsporiadatel: any) => {



        const newturnaj: Turnaj = {id: null,
                                   nazov: event.data.nazov,
                                   stav_turnaja: "planovany",
                                   zaciatok: event.data.zaciatok.substring(0, 10),
                                   koniec: event.data.koniec.substring(0, 10),
                                   vyhra: event.data.vyhra,
                                   sponzori: event.data.sponzori,
                                   povrch: event.data.povrch,
                                   podmienky_turnajaID: respPodmienTurnaja.insertId,
                                   usporiadatelID: respUsporiadatel.insertId};

        console.log(newturnaj);
        // Prida turnaj a aktualizuje tabulky
        this.server.createTurnaj(newturnaj).then(() => {
          this.getVsetkyTurnaje();
        });

      })
    });
    };

  updateTurnaj(event) {
    const updateturnaj: Turnaj = {id: event.data.id,
                               nazov: event.data.nazov,
                               stav_turnaja: event.data.stav_turnaja,
                               zaciatok: event.data.zaciatok.substring(0, 10),
                               koniec: event.data.koniec.substring(0, 10),
                               vyhra: event.data.vyhra,
                               sponzori: event.data.sponzori,
                               povrch: event.data.povrch,
                               podmienky_turnajaID : event.data.podmienky_turnajaID,
                               usporiadatelID: event.data.usporiadatelID};

    // Aktualizuje turnaj a zaaktualizuje tabulky
    this.server.updateTurnaj(updateturnaj).then(() => {
      this.getVsetkyTurnaje();
    });
  }

  deleteTurnaj(event) {
    const deleteturnaj: Turnaj = {id: event.data.id,
                                  nazov: event.data.nazov,
                                  stav_turnaja: event.data.stav_turnaja,
                                  zaciatok: event.data.zaciatok.substring(0, 10),
                                  koniec: event.data.koniec.substring(0, 10),
                                  vyhra: event.data.vyhra,
                                  sponzori: event.data.sponzori,
                                  povrch: event.data.povrch,
                                  podmienky_turnajaID : event.data.podmienky_turnajaID,
                                  usporiadatelID: event.data.usporiadatelID};

    // Aktualizuje turnaj a zaaktualizuje tabulky
    this.server.deleteTurnaj(deleteturnaj).then(() => {
      this.getVsetkyTurnaje();
    });
  }


  UlozitPodmienkyTurnaja(){


    const updatePodmienkyTurnaja: Podmienky_turnaja = {id: this.rowClick_PodmienTurnajaId,
                                                       minimalny_vek_hracov: this.minVek,
                                                       pocet_hracov_v_tyme: this.pocetHracVTyme,
                                                       pocet_tymov: this.pocetTymov,
                                                       registracny_poplatok: this.regPoplatok,
                                                       druh_hry: ""
    };

    if (this.hraKlasicka){
      updatePodmienkyTurnaja.druh_hry = "klasicka";
    } else if (this.hraZmiesana){
      updatePodmienkyTurnaja.druh_hry = "zmiesana";
    }

    // Aktualizuje vypis podmienky turnaja
    this.server.updatePodmienky_turnaja(updatePodmienkyTurnaja).then(() => {
      this.getVsetkyTurnaje();
    });

    const updateturnaj: Turnaj = {id: this.eventSave.data.id,
                                  nazov: this.eventSave.data.nazov,
                                  stav_turnaja: this.eventSave.data.stav_turnaja,
                                  zaciatok: this.eventSave.data.zaciatok.substring(0, 10),
                                  koniec: this.eventSave.data.koniec.substring(0, 10),
                                  vyhra: this.eventSave.data.vyhra,
                                  sponzori: this.eventSave.data.sponzori,
                                  povrch: this.eventSave.data.povrch,
                                  podmienky_turnajaID : this.eventSave.data.podmienky_turnajaID,
                                  usporiadatelID: this.eventSave.data.usporiadatelID};


    if (this.hraPlanovana){
      updateturnaj.stav_turnaja = "planovany";
    } else if (this.hraPrebieha) {
      updateturnaj.stav_turnaja = "prebieha";
    } else if (this.hraUkoncena){
      updateturnaj.stav_turnaja = "ukonceny";
    }

    // Aktualizuje vypis podmienky turnaja
    this.server.updateTurnaj(updateturnaj).then(() => {
      this.getVsetkyTurnaje();
    });

  }


  UlozitUsporiadatela(){

    var inputValue = (<HTMLInputElement>document.getElementById("usporiadatelImputTxt")).value;
    const UserID: string = localStorage.getItem('userId');
    let nwUsporiadatel: Usporiadatel = {
      id: null, organizacia: inputValue, uzivatelID: +UserID
    };
    this.server.createUsporiadatel(nwUsporiadatel);
  }


  onKlasickaChange() {
    this.hraKlasicka = true;
    this.hraZmiesana = false;
  }

  onZmiesanaChange() {
    this.hraKlasicka = false;
    this.hraZmiesana = true;
  }

  onPlanovanaChange() {
    this.hraPlanovana = true;
    this.hraPrebieha = false;
    this.hraUkoncena = false;
  }

  onPrebiehaChange() {
    this.hraPlanovana = false;
    this.hraPrebieha = true;
    this.hraUkoncena = false;
  }

  onUkoncenaChange() {
    this.hraPlanovana = false;
    this.hraPrebieha = false;
    this.hraUkoncena = true;
  }

  turnajUzavriRozlosuj() {

    console.log(this.eventSave);

    if (this.eventSave === undefined){
      this.eventSaveError = true;
      return;
    } else {
      this.eventSaveError = false;
    }


    let tmpTurnaj: Turnaj = {id: this.eventSave.data.id,
                             nazov: this.eventSave.data.nazov,
                             stav_turnaja: this.eventSave.data.stav_turnaja,
                             zaciatok: this.eventSave.data.zaciatok.substring(0, 10),
                             koniec: this.eventSave.data.koniec.substring(0, 10),
                             vyhra: this.eventSave.data.vyhra,
                             sponzori: this.eventSave.data.sponzori,
                             povrch: this.eventSave.data.povrch,
                             podmienky_turnajaID : this.eventSave.data.podmienky_turnajaID,
                             usporiadatelID: this.eventSave.data.usporiadatelID};

    this.server.getTurnajByTim(tmpTurnaj).then(( arrayTurnaj:any ) => {

      console.log(arrayTurnaj);

      if (arrayTurnaj.length === 8 || arrayTurnaj.length === 4){
        this.eventSaveError_expect4or8tymov = false;
      } else {
        this.eventSaveError_expect4or8tymov = true;
        return
      }

      const tmpgetPodmienkyTurnaja: Podmienky_turnaja = {id: this.eventSave.data.Podmienky_turnajaID,
                                                         minimalny_vek_hracov: null,
                                                         pocet_hracov_v_tyme: null,
                                                         pocet_tymov: null,
                                                         registracny_poplatok: "",
                                                         druh_hry: ""
      };

      this.server.getPodmienky_turnaja(tmpgetPodmienkyTurnaja).then(( tmpPodmiekyTur:any ) => {

        if (tmpPodmiekyTur[0].Pocet_hracov_v_tyme === 1) {
          console.log("Hrac");


        } else {
          console.log("Tym");

          let newZapas: Zapas = {id: null, nazov: '', miesto: '', datum: null, stav: null, vyherca: null, uroven_zapasu: 1, turnajID: this.eventSave.data.id};


          this.server.createZapas(newZapas).then(( createdZapas:any ) => {
            console.log("InsertID createdZapas", createdZapas.insertId);

            newZapas.id = createdZapas.insertId;
            console.log("new zapas", newZapas);
            console.log("new tym", arrayTurnaj[0]);

            this.server.createTim_hra_v_zapase(newZapas, arrayTurnaj[0]);
            this.server.createTim_hra_v_zapase(newZapas, arrayTurnaj[1]);

          });
        }
      });
    });


  }
}


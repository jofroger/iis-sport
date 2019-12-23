/* tslint:disable:max-line-length */
import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Hrac, Tim, Uzivatel} from '../api.structures';
import { Location } from "@angular/common";


@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  //local timLoadTim

  nazov_Tymu: string;
  logo_tymu: string
  pocet_hracov_Tymu: number;
  pocet_zapasov_Tymu: number;
  pocet_vyhranych_zapasov_Tymu: number;

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

  activeUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', vek: null, email: '', login: '', heslo: '', typ: ''};
  activeUzivatelHrac: Hrac = {id: null, odohrane_zapasy: '', pocet_vyhier: null, fotka: '', uzivatelID: null};

  joinTeamIsVisible: Boolean = (localStorage.getItem('userId') == null);
  leaveTeamIsVisible: Boolean = (localStorage.getItem('userId') == null) && !this.joinTeamIsVisible;
  playerCounter: any = 0;
  nieSiHracError: boolean = false;
  uzSiVTymeError: boolean = false;

  constructor(private server: ApiService, private location : Location) {}

  ngOnInit() {
    this.showJoinLeaveTeamButton();
    this.loadTim();
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  loadTim() {
    // this.tim.id = +localStorage.getItem('timID'); // + je konverzia zo str na int
    // console.log("this.id prvy krat",this.tim.id);


    let timLoadTim: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
    timLoadTim.id = +localStorage.getItem('timID'); // + je konverzia zo str na int



    this.server.getTim(timLoadTim).then( (resp: any) => {
      // console.log("getTIm resp", resp[0].Id);
      timLoadTim.id = resp[0].TimID;

      timLoadTim.nazov = resp[0].Nazov;
      this.nazov_Tymu = resp[0].Nazov;

      timLoadTim.logo = resp[0].Logo;
      this.logo_tymu = resp[0].Logo;

      timLoadTim.pocet_hracov = resp[0].Pocet_hracov;
      this.pocet_hracov_Tymu = resp[0].Pocet_hracov;


      timLoadTim.odohrane_zapasy = resp[0].Odohrane_zapasy;
      this.pocet_zapasov_Tymu = resp[0].Odohrane_zapasy;

      timLoadTim.pocet_vyhier = resp[0].Pocet_vyhier;
      this.pocet_vyhranych_zapasov_Tymu = resp[0].Pocet_vyhier;


      // this.tim.id = resp[0].Id;
      // console.log("this.id druhy krat",this.tim);
      //
      // this.tim.nazov = resp[0].Nazov;
      // this.tim.logo = resp[0].Logo;
      // this.tim.pocet_hracov = resp[0].Pocet_hracov;
      // this.tim.odohrane_zapasy = resp[0].Odohrane_zapasy;
      // this.tim.pocet_vyhier = resp[0].Pocet_vyhier;
      //
      // console.log("this.id druhy krat",this.tim);

      for (let i = 1; i <= 2; i++) {  // Opakuj pre maximalny pocet zobrazenych hracov
        document.getElementById('player' + i).style.display = 'block';
        // this.server.getHracByTim(this.tim).then( (respons: any) => { // Ziskaj vsetkych hracov timu
        this.server.getHracByTim(timLoadTim).then( (respons: any) => { // Ziskaj vsetkych hracov timu

          if (respons[i - 1] !== undefined) {
            this.playerCounter++;

            document.getElementById('player' + i).style.display = 'block';
            this['hrac' + i].odohrane_zapasy = respons[i - 1].Odohrane_zapasy;
            this['hrac' + i].pocet_vyhier = respons[i - 1].Pocet_vyhier;
            this['hrac' + i].fotka = respons[i - 1].Fotka;
            (respons[i - 1].Fotka !== undefined) ? this['hrac' + i].fotka = respons[i - 1].Fotka : this['hrac' + i].fotka = '../../assets/image-placeholder.jpg';
            this['uzivatel' + i].id = respons[i - 1].UzivatelID;

            this.server.getUzivatel(this['uzivatel' + i]).then( (response: any) => {
              this['uzivatel' + i].meno = response[0].Meno;
              this['uzivatel' + i].priezvisko = response[0].Priezvisko;
              this['uzivatel' + i].vek = response[0].Vek;
            });
            if (this.playerCounter === 2) {  // Ak je v time, ale nie v tom, ktory je prave zobrazeny
              this.joinTeamIsVisible = false;
            }
          } else {
            document.getElementById('player' + i).style.display = 'none';
          }
        });
      }
    });
  }

  private showJoinLeaveTeamButton() {
    this.activeUzivatel.id = +localStorage.getItem('userId');
    if (this.activeUzivatel.id > 0) {
      this.server.getHracByUzivatel(this.activeUzivatel). then( (HracByUzivatelResponse: any) => {

        if (HracByUzivatelResponse[0] === undefined){
          this.nieSiHracError = true;
          return;
        } else {
          this.nieSiHracError = false;
        }


        this.activeUzivatelHrac.id = HracByUzivatelResponse[0].HracID; //Ziskane HracID priradit do struktury

        this.activeUzivatelHrac.fotka = HracByUzivatelResponse[0].Fotka;
        this.activeUzivatelHrac.odohrane_zapasy = HracByUzivatelResponse[0].Odohrane_zapasy;
        this.activeUzivatelHrac.pocet_vyhier = HracByUzivatelResponse[0].Pocet_vyhier;


        const UserID: string = localStorage.getItem('userId'); //Ziskanie ID z prehliadaca o prihlasenom
        this.activeUzivatelHrac.uzivatelID = +UserID; //Priradenie


      // await this.delay(200);
      this.server.getTimByHrac(this.activeUzivatelHrac).then((getTimByHracResponse: any) => {

        this.tim.id = +localStorage.getItem('timID');



        if (getTimByHracResponse[0] === undefined) {  // Ak este nie je v ziadnom time
          this.joinTeamIsVisible = true;
          this.leaveTeamIsVisible = false;
        } else if (this.tim.id === getTimByHracResponse[0].TimID) { // Ak je v time, ktory je prave zobrazeny
          this.joinTeamIsVisible = false;
          this.leaveTeamIsVisible = true;
        } else {  // Ak je v time, ale nie v tom, ktory je prave zobrazeny
          this.uzSiVTymeError = true;
          this.joinTeamIsVisible = false;
          this.leaveTeamIsVisible = false;
        }
        if (this.playerCounter === 2) {  // Ak je v time, ale nie v tom, ktory je prave zobrazeny
          this.joinTeamIsVisible = false;
        }
      });
    });
    } else {
      this.joinTeamIsVisible = false;
      this.leaveTeamIsVisible = false;
    }
  }

   joinTeam() {

     console.log("hracResp");

     let joinUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', vek: null, email: '', login: '', heslo: '', typ: ''};
     let joinUzivatelHrac: Hrac = {id: null, odohrane_zapasy: '', pocet_vyhier: null, fotka: '', uzivatelID: null};

     joinUzivatel.id = +localStorage.getItem('userId');
     if (joinUzivatel.id > 0) {
       this.server.getHracByUzivatel(joinUzivatel).then((joinHracByUzivatelResponse: any) => {

         joinUzivatelHrac.id = joinHracByUzivatelResponse[0].HracID; //Ziskane HracID priradit do struktury

         joinUzivatelHrac.fotka = joinHracByUzivatelResponse[0].Fotka;
         joinUzivatelHrac.odohrane_zapasy = joinHracByUzivatelResponse[0].Odohrane_zapasy;
         joinUzivatelHrac.pocet_vyhier = joinHracByUzivatelResponse[0].Pocet_vyhier;


         this.server.getTimByHrac(joinUzivatelHrac).then((joinHracResp: any) => { // Ziskaj vsetkych hracov timu

           console.log("hracResp", joinHracResp);

           if (joinHracResp.length === 0) {


             let joinLoadTim: Tim = {id: null, nazov: '', logo: '', pocet_hracov: null, odohrane_zapasy: null, pocet_vyhier: null};
             joinLoadTim.id = +localStorage.getItem('timID'); // + je konverzia zo str na int



             this.server.getTim(joinLoadTim).then( (resp: any) => {
               joinLoadTim.id = resp[0].TimID;
               joinLoadTim.nazov = resp[0].Nazov;
               joinLoadTim.logo = resp[0].Logo;
               joinLoadTim.pocet_hracov = resp[0].Pocet_hracov;
               joinLoadTim.odohrane_zapasy = resp[0].Odohrane_zapasy;
               joinLoadTim.pocet_vyhier = resp[0].Pocet_vyhier;

               this.server.createHrac_hra_v_time(joinUzivatelHrac, joinLoadTim);
               this.location.back();

               // this.server.createHrac_hra_v_time(joinUzivatelHrac, this.tim);
             })
           } else { this.location.back(); }
         });
       });
     }
   }
  leaveTeam() {
    this.server.deleteHrac_hra_v_time(this.activeUzivatelHrac, this.tim);
    this.location.back();
  }
}

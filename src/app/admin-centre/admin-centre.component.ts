import { Component, OnInit } from '@angular/core';

import { Uzivatel } from '../api.structures'
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-centre',
  templateUrl: './admin-centre.component.html',
  styleUrls: ['./admin-centre.component.css']
})
export class AdminCentreComponent implements OnInit {

  index : any = 0;
  actUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:'', typ:''};
  uzivatelia: Uzivatel[] = [];

  constructor(private server : ApiService, private router : Router) { }

  ngOnInit() {
    this.getUzivatelia();
  }

  getUzivatelia() {
    this.server.getAllUzivatel().then( (resp:any) => {
      this.uzivatelia = resp.map( (uz) => {
        uz.id = uz.UzivatelID;
        uz.meno = uz.Meno;
        uz.priezvisko = uz.Priezvisko;
        uz.vek = uz.Vek;
        uz.typ = uz.Typ;
        uz.email = uz.Email;
        uz.login = uz.Login;
        uz.heslo = uz.Heslo;
        return uz;
      })

      this.setActUzivatel(this.index);
    })
  }

  updateUzivatel() {
    this.server.updateUzivatel(this.actUzivatel).then( () => {
      this.getUzivatelia();
    })
  }

  setActUzivatel(idx) {
    this.index = idx;
    this.actUzivatel = this.uzivatelia[this.index];
  }

  updateUser() {
    localStorage.setItem('userIdForEdit', String(this.actUzivatel.id))
    this.router.navigate(['/update-user']);
  }

  deleteUser() {
    let cantDelete = true;

    this.server.deleteUzivatel(this.actUzivatel).then( (resp:any) => {
      alert("Užívateľ bol odstránený")
      cantDelete = false;
      this.index = 0;
      this.getUzivatelia();
    })
    
    if (cantDelete) alert("Užívateľa nie je možné odstrániť. Je registrovaný ako hráč, usporiadateľ alebo rozhodca.");
  }

  makeAdmin() {
    this.actUzivatel.typ = "admin";
    this.updateUzivatel();
  }

  deleteAdmin() {
    this.actUzivatel.typ = "normalny";
    this.updateUzivatel();
  }
}

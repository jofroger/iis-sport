import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Uzivatel } from '../api.structures';
import { UserCtx } from '../user-ctx';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  actUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:'', typ: ''};

  constructor(private server: ApiService) { }

  ngOnInit() {
    this.getUzivatel();
  }

  // ziskame konkretneho uzivatela
  private getUzivatel() {
    console.log(localStorage.getItem('userId'));
    this.actUzivatel.id = Number(localStorage.getItem('userId'));

    this.server.getUzivatel(this.actUzivatel).then( (resp: any) => {
      this.actUzivatel.meno = resp[0].Meno;
      this.actUzivatel.priezvisko = resp[0].Priezvisko;
      this.actUzivatel.vek = resp[0].Vek;
      this.actUzivatel.email = resp[0].Email;
      this.actUzivatel.login = resp[0].Login;
      this.actUzivatel.heslo = resp[0].Heslo;
    });
  }
}

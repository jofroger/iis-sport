import { Component, OnInit } from '@angular/core';
import { Uzivatel } from '../api.structures';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-psw',
  templateUrl: './change-psw.component.html',
  styleUrls: ['./change-psw.component.css']
})
export class ChangePswComponent implements OnInit {

  actUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:'', typ: ''};
  noveHeslo: String = null;
  noveHeslo_znova: String = null;

  constructor(private server: ApiService, private router: Router) { }

  ngOnInit() {
    this.getUzivatel();
  }

  // ziskame konkretneho uzivatela
  private getUzivatel() {
    this.actUzivatel.id = 7;

    this.server.getUzivatel(this.actUzivatel).then( (resp: any) => {
      this.actUzivatel.meno = resp[0].Meno;
      this.actUzivatel.priezvisko = resp[0].Priezvisko;
      this.actUzivatel.vek = resp[0].Vek;
      this.actUzivatel.email = resp[0].Email;
      this.actUzivatel.login = resp[0].Login;
      this.actUzivatel.heslo = resp[0].Heslo;
      this.actUzivatel.typ = resp[0].Typ;
    });
  }

  updateHeslo() {
    if (this.noveHeslo === null || this.noveHeslo_znova === null) {
      alert("Nezadali ste nové heslo");
    }
    else {
      if (this.noveHeslo === this.noveHeslo_znova) {
        this.actUzivatel.heslo = this.noveHeslo;
        this.server.updateUzivatel(this.actUzivatel).then( () => {
          this.router.navigate(['/user-detail']);
        });
      }
      else {
        alert("Heslá sa nezhodujú");
      }
    }
  }
}

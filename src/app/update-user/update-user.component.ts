import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Uzivatel } from '../api.structures';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  actUser: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:'', typ:''};

  constructor(private server: ApiService, private router: Router) { }

  ngOnInit() {
    this.getUzivatel();
  }

  private getUzivatel() {
    if (localStorage.getItem('userIdForEdit') == null) {
      this.actUser.id = Number(localStorage.getItem('userId'));
    }
    else {
      this.actUser.id = Number(localStorage.getItem('userIdForEdit'));
    }

    this.server.getUzivatel(this.actUser).then( (resp: any) => {
      this.actUser.meno = resp[0].Meno;
      this.actUser.priezvisko = resp[0].Priezvisko;
      this.actUser.vek = resp[0].Vek;
      this.actUser.email = resp[0].Email;
      this.actUser.login = resp[0].Login;
      this.actUser.heslo = resp[0].Heslo;
      this.actUser.typ = resp[0].Typ;
    });
  }

  updateUzivatel() {
    this.server.updateUzivatel(this.actUser).then( () => {
      if (localStorage.getItem('userIdForEdit') == null) {
        this.router.navigate(['/user-detail']);
      }
      else {
        localStorage.removeItem('userIdForEdit')
        this.router.navigate(['/admin-centre']);
      }
    });
  }
}

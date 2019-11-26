import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Uzivatel } from '../api.structures';
import { Router } from "@angular/router";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  actUser: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:''};

  constructor(private server : ApiService, private router : Router) { }

  ngOnInit() {
    this.getUzivatel();
  }

  private getUzivatel() {
    this.actUser.id = 7;

    this.server.getUzivatel(this.actUser).then( (resp : any) => {
      this.actUser.meno = resp[0].Meno;
      this.actUser.priezvisko = resp[0].Priezvisko;
      this.actUser.vek = resp[0].Vek;
      this.actUser.email = resp[0].Email;
      this.actUser.login = resp[0].Login;
      this.actUser.heslo = resp[0].Heslo;
    })
  }

  private updateUzivatel() {
    this.server.updateUzivatel(this.actUser).then( () => {
      this.router.navigate(['/user-detail']);
    })
  }
}

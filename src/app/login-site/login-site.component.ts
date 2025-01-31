import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { ApiService } from '../api.service';
import { Uzivatel } from '../api.structures';
import {printLine} from 'tslint/lib/verify/lines';
import {MyErrorStateMatcher} from '../default.error-matcher';

import { FormControl, FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-login-site',
  templateUrl: './login-site.component.html',
  styleUrls: ['./login-site.component.css']
})

export class LoginSiteComponent {
  hide: boolean;
  username: string;
  password: string;

  // uzivatelia: Uzivatel[] = [];
  currentUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo: '', typ: ''};

  constructor(private router: Router, private server: ApiService) {
    this.hide = true;
  }

  private ErrorMessage = {
    'Wrong-Password-msg' : 'Vase heslo moze byt nespravne.',
  };

  matcher = new MyErrorStateMatcher();
  nameControl = new FormControl('');

  onSignIn() {

    // Logika prihlasovania
    this.server.getAllUzivatel().then( (resp: any) => {

      let verifyLogin: boolean;
      let verifyPassw: boolean;
      verifyLogin = false;
      verifyPassw = false;

      for ( const Clovek of resp) {

        if (Clovek.Login === this.username) {
          if (Clovek.Heslo === this.password) {
            console.log('pristup povoleny'); // TODO spristupnit portal
            localStorage.setItem('userId', Clovek.UzivatelID);
            localStorage.setItem('userType', Clovek.Typ);
            console.log(localStorage.getItem('userId'));
            this.router.navigate(['/']);
          }
          else {
            this.nameControl.setErrors({invalid: true});
            break;
          }
        }
        else {
          this.nameControl.setErrors({invalid: true});
        }
      }
    })
  }

//   // ziskame konkretneho uzivatela
//   private getUzivatel() {
//     this.currentUzivatel.id = 5;
//     this.server.getUzivatel(this.currentUzivatel).then( (resp : any) => {
//       this.currentUzivatel.meno = resp[0].Meno;
//       this.currentUzivatel.priezvisko = resp[0].Priezvisko;
//       this.currentUzivatel.vek = resp[0].Vek;
//       this.currentUzivatel.email = resp[0].Email;
//       this.currentUzivatel.login = resp[0].Login;
//       this.currentUzivatel.heslo = resp[0].Heslo;
//     });
//   }



}

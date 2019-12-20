import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {EventEmitterService} from '../event-emitter.service';
import {MyErrorStateMatcher} from '../default.error-matcher';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Uzivatel} from '../api.structures';
import { Location } from '@angular/common';



@Component({
  selector: 'app-register-site',
  templateUrl: './register-site.component.html',
  styleUrls: ['./register-site.component.css']
})



export class RegisterSiteComponent implements OnInit {

     hide: boolean;
     login: string;
     name: string;
     surname: string;
     age: number;
     email: string;

     password: string;

    form: FormGroup;




  constructor(private fb: FormBuilder,
              private eventEmitterService: EventEmitterService,
              private router: Router,
              private location: Location,
              private server: ApiService) {
    this.hide = true;
  }


  matcher = new MyErrorStateMatcher();

  loginControl = new FormControl('');
  nameControl = new FormControl('');
  surnameControl = new FormControl('');
  ageControl = new FormControl('');
  emailControl = new FormControl('');
  passwordControl = new FormControl('');



  uzivatelia: Uzivatel[] = [];
  currentUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo: '', typ: ''};


  ngOnInit(): void {
    this.form = this.fb.group(
      {
        emailValidator : this.fb.control('', [Validators.required, Validators.email]),
        ageValidator : this.fb.control('', [Validators.required]),
        nameValidator : this.fb.control('', [Validators.required]),
        surnameValidator : this.fb.control('', [Validators.required]),
        loginValidator : this.fb.control('', [Validators.required]),

      }
    );
  }

  // ziskame vsetkych uzivatelov a vypiseme ich do prikazovej riadky
  private getUzivatelia() {
    this.server.getAllUzivatel().then( (resp: any) => {
      this.uzivatelia = resp;
      console.log(this.uzivatelia);
    });
  }




  onCreateAccount() {
    console.log(this.login);

    if (this.login === '') {
      this.nameControl.setErrors({invalid: true});
      return;
    }

    if (this.name === '') {
      this.nameControl.setErrors({invalid: true});
    }
    if (this.surname === '') {
      this.surnameControl.setErrors({invalid: true});
    }
    if (isNaN(this.age)) {
      this.ageControl.setErrors({invalid: true});
    }
    if (this.email === '') {
      this.emailControl.setErrors({invalid: true});
    }
    if (this.password === '') {
      this.passwordControl.setErrors({invalid: true});
    }

    // Overenie ze neexistuje uz rovnaky login v db
    this.server.getAllUzivatel().then( (resp: any) => {
      console.log(resp);
      let verifyLogin: boolean;
      let verifyPassw: boolean;
      verifyLogin = false;
      verifyPassw = false;
      console.log(resp);
      for ( const Clovek of resp) {
        if (Clovek.Login === this.login) {
          verifyLogin = true;
        }
      }
      if (verifyLogin) {
        this.loginControl.setErrors({invalid: true});
      }
    });


    const newUzivatel: Uzivatel = {
      id: null,                     // id pri vytvarani sa neberie do uvahy
      meno: this.name,
      priezvisko: this.surname,
      vek: this.age,
      email: this.email,
      login: this.login,
      heslo: this.password,
      typ: 'normalny'
      };

    this.server.createUzivatel(newUzivatel).then( () => {
      this.getUzivatelia();
      });


    this.server.getAllUzivatel().then( (resp: any) => {
      console.log(resp);
    });

    this.location.back();
  }


    alreadyHaveAccount() {
    this.eventEmitterService.CallLoginSiteRoute();
  }
}

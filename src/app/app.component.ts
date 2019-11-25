import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { LoginComponent } from 'login-site';

import { ApiService } from './api.service';
import { Uzivatel } from './api.structures';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})


export class AppComponent implements OnInit {
  title = 'iis-sport';

  uzivatelia: Uzivatel[] = [];
  currentUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo: ''};

  constructor(private server: ApiService) { }
  // constructor() { }

  ngOnInit() {
  }

}

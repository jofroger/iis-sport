import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { LoginComponent } from 'login-site';

import { ApiService } from './api.service';
import { Uzivatel } from './api.structures';
import {EventEmitterService} from './event-emitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})


export class AppComponent implements OnInit {
  title = 'iis-sport';

  uzivatelia: Uzivatel[] = [];
  currentUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo: ''};

  constructor(private eventEmitterService: EventEmitterService,
              private router: Router,
              private server: ApiService) { }
  // constructor() { }

  ngOnInit() {
    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      LoginSiteRoute.subscribe((name: string) => {
        this.LoginRoute();
      });
    }
  }

  get loginTable() {
    return this.router.url === '/login';
  }

  LoginRoute() {
    // alert( 'Hello ' + '\nWelcome to C# Corner \nFunction in First Component');
    return this.router.url === '/login';
  }

}

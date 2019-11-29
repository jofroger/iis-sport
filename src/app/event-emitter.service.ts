import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  LoginSiteRoute = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  CallLoginSiteRoute() {
    this.LoginSiteRoute.emit();
  }
}

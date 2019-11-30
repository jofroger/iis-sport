import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Hrac, Uzivatel, Tim } from './api.structures';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerListResolveService {

  hraci : Hrac[] = [];
  actUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:'', typ:''};
  uzivatelia: Uzivatel[] = [];

  constructor(private server : ApiService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.server.getUzivatelAndHrac().then( (resp:any) => {
      /*this.hraci = resp.map( (hr) => {
        hr.id = hr.HracID;
        hr.odohrane_zapasy = hr.Odohrane_zapasy;
        hr.pocet_vyhier = hr.Pocet_vyhier;
        hr.fotka = hr.Fotka;
        hr.uzivatelID = hr.UzivatelID;

        return hr;
      });
      console.log(this.hraci)*/

      return resp;
    })
  }
}

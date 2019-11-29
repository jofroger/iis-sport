import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Uzivatel } from '../api.structures';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {

  uzivatelia: Uzivatel[] = [];
  currentUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:'', typ:''};
  

  constructor(private server: ApiService) { }

  ngOnInit() {
    // v programe sa to inicializuje na aktualne vybraneho uzivatela
  }

  // ziskame vsetkych uzivatelov a vypiseme ich do prikazovej riadky
  getUzivatelia() {
    this.server.getAllUzivatel().then( (resp:any) => {
      this.uzivatelia = resp;
      console.log(this.uzivatelia);
    })
  }

  // ziskame konkretneho uzivatela
  getUzivatel() {
    this.currentUzivatel.id = 5;

    this.server.getUzivatel(this.currentUzivatel).then( (resp : any) => {
      this.currentUzivatel.meno = resp[0].Meno;
      this.currentUzivatel.priezvisko = resp[0].Priezvisko;
      this.currentUzivatel.vek = resp[0].Vek;
      this.currentUzivatel.email = resp[0].Email;
      this.currentUzivatel.login = resp[0].Login;
      this.currentUzivatel.heslo = resp[0].Heslo;
    })
  }

  // pri create je potrebne vyplnit danu strukturu, pri tomto priklade uzivatel
  // a poslat ju pomocou API, po poslani si aktualizujeme zoznam aktualnych uzivatelov
  createUzivatel() {
    let newUzivatel: Uzivatel = {
      id: null,                     // id pri vytvarani sa neberie do uvahy
      meno: 'Janko',
      priezvisko: 'Hrasko',
      vek: 17,
      email: 'hrasko@gmail.com',
      login: 'janko',
      heslo: 'heslo123*',
      typ: 'normalny'
    }
    
    this.server.createUzivatel(newUzivatel).then( () => {
      this.getUzivatelia();
    })
  }

  // pri update je potrebne vyplnit danu strukturu, pri tomto priklade uzivatel
  // a poslat ju pomocou API, po poslani si aktualizujeme zoznam aktualnych uzivatelov
  updateUzivatel() {
    let updatedUzivatel: Uzivatel = {
      id: this.currentUzivatel.id,                    
      meno: this.currentUzivatel.meno,
      priezvisko: this.currentUzivatel.priezvisko,
      vek: this.currentUzivatel.vek,
      email: this.currentUzivatel.email,
      login: this.currentUzivatel.login,
      heslo: this.currentUzivatel.heslo,
      typ: this.currentUzivatel.typ
    }

    this.server.updateUzivatel(updatedUzivatel).then( () => {
      this.getUzivatelia();
    })
  }

  // pri delete nam treba, len ID uzivatela, ktoreho chceme mazat
  deleteUzivatel() {
    this.currentUzivatel.id = 5;

    this.server.deleteUzivatel(this.currentUzivatel).then( (resp:any) => {
      //this.getUzivatelia();
    })
  }

}

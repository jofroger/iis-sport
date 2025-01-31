import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Uzivatel, Hrac } from '../api.structures';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  hracNonExists : Boolean = true;
  actUzivatel: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:'', typ: ''};
  
  constructor(private server: ApiService, private http: HttpClient, private el: ElementRef) { }

  ngOnInit() {
    this.getUzivatel();
  }

  // ziskame konkretneho uzivatela
  private getUzivatel() {
    this.actUzivatel.id = Number(localStorage.getItem('userId'));

    this.server.getUzivatel(this.actUzivatel).then( (resp: any) => {
      this.actUzivatel.meno = resp[0].Meno;
      this.actUzivatel.priezvisko = resp[0].Priezvisko;
      this.actUzivatel.vek = resp[0].Vek;
      this.actUzivatel.email = resp[0].Email;
      this.actUzivatel.login = resp[0].Login;
      this.actUzivatel.heslo = resp[0].Heslo;

      this.checkForHrac();
    });
  }

  checkForHrac() {
    this.server.getHracByUzivatel(this.actUzivatel).then( (resp: any) => {
      if (resp.length !== 0) this.hracNonExists = false;
    });
  }

  createHrac(imgPath) {
    let newHrac: Hrac = {
      id: null,
      odohrane_zapasy: "0",
      pocet_vyhier: 0,
      fotka: imgPath,
      uzivatelID: this.actUzivatel.id
    }
        
    this.server.createHrac(newHrac).then(() => {
      alert("Boli ste pridaný medzi hráčov");
      this.checkForHrac();
    });
  }


  uploadHracImg() {    
    this.createHrac("../../assets/fotky_hracov/generic.png");

    /*
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) {
      formData.append('photo', inputEl.files.item(0));
      this.server.uploadImgHrac(formData).then( (resp:any) => {
        this.createHrac(resp.Fotka);
      })
    }
    else alert("Prosím vyberte si profilovú fotografiu");*/
  }
}

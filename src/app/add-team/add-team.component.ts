import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Uzivatel, Tim } from '../api.structures';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  
  newTim: Tim = {id: null, nazov: '', logo: '', pocet_hracov: 2, odohrane_zapasy: 0, pocet_vyhier: 0};

  constructor(private server: ApiService, private router: Router, private el: ElementRef) { }

  ngOnInit() {
  }

  createTim() {
    if (this.newTim.nazov !== '') {
      let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
      let fileCount: number = inputEl.files.length;
      let formData = new FormData();
      if (fileCount > 0) {
        formData.append('photo', inputEl.files.item(0));
        this.server.uploadImgTim(formData).then( (resp:any) => {
          this.newTim.logo = resp.Fotka;
          this.server.createTim(this.newTim).then( () => {
            this.router.navigate(['/']);
          })
        })
      }
    }
    else {
      alert("Vyplňte všetky povinné polia")
    }
  }
}
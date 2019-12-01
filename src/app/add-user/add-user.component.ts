import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Uzivatel } from '../api.structures';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  newUser: Uzivatel = {id: null, meno: '', priezvisko: '', email: '', vek: null, login: '', heslo:'', typ:'normalny'};

  constructor(private server: ApiService, private router: Router) { }

  ngOnInit() {
  }

  createUzivatel() {
    if (this.newUser.email !== '' && this.newUser.login !== '' && this.newUser.heslo !== '') {
      this.server.createUzivatel(this.newUser).then( () => {
        this.router.navigate(['/admin-centre']);
      })
    }
    else {
      alert("Vyplňte všetky povinné polia")
    }
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {

  loginIsVisible: Boolean = (localStorage.getItem('userId') == null);
  logoutIsVisible: Boolean = (localStorage.getItem('userId') != null);
  userDetailIsVisible: Boolean = (localStorage.getItem('userId') != null);
  adminCentreIsVisible: Boolean = (localStorage.getItem('userType') === 'admin');
  tournamentCenterIsVisible: Boolean = (localStorage.getItem('userId') != null);

  constructor() { }

  ngOnInit() {
  }

  logoff() {
    localStorage.removeItem('userId');
  }

}

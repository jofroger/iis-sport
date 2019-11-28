import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginSiteComponent} from './login-site/login-site.component';
import {RegisterSiteComponent} from './register-site/register-site.component';


const routes: Routes = [
  {path: 'login', component: LoginSiteComponent},
  {path: 'register', component: RegisterSiteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

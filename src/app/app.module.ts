import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule, MatInputModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { ExampleComponent } from './example/example.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ChangePswComponent } from './change-psw/change-psw.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { HomePageComponent } from './home-page/home-page.component';
import {LoginSiteComponent} from './login-site/login-site.component';
import {RegisterSiteComponent} from './register-site/register-site.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerDetailComponent,
    ExampleComponent,
    TeamDetailComponent,
    UserDetailComponent,
    ChangePswComponent,
    UpdateUserComponent,
    HomePageComponent,
    LoginSiteComponent,
    RegisterSiteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

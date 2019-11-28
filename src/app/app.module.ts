import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginSiteComponent } from './login-site/login-site.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterSiteComponent } from './register-site/register-site.component';
import {EventEmitterService} from './event-emitter.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginSiteComponent,
    RegisterSiteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    EventEmitterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

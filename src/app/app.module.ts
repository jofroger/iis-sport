import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatInputModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExampleComponent } from './example/example.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ChangePswComponent } from './change-psw/change-psw.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginSiteComponent } from './login-site/login-site.component';
import { RegisterSiteComponent } from './register-site/register-site.component';
import { ChampionshipTreeComponent } from './championship-tree/championship-tree.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { AdminCentreComponent } from './admin-centre/admin-centre.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RefereeCentreComponent } from './referee-centre/referee-centre.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GamesOverviewComponent } from './games-overview/games-overview.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { TournamentCenterComponent } from './tournament-center/tournament-center.component';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    TeamDetailComponent,
    UserDetailComponent,
    ChangePswComponent,
    UpdateUserComponent,
    HomePageComponent,
    LoginSiteComponent,
    RegisterSiteComponent,
    HeaderMenuComponent,
    PlayerListComponent,
    ChampionshipTreeComponent,
    PlayerListComponent,
    FileSelectDirective,
    AdminCentreComponent,
    AddUserComponent,
    RefereeCentreComponent,
    GamesOverviewComponent,
    GameDetailComponent,
    AddTeamComponent,
    TournamentCenterComponent,
    TournamentDetailComponent
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
    MatInputModule,
    MatTableModule,
    MatGridListModule,
    ScrollingModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

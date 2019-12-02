import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleComponent } from './example/example.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { ChangePswComponent } from './change-psw/change-psw.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginSiteComponent } from './login-site/login-site.component';
import { RegisterSiteComponent } from './register-site/register-site.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { AdminCentreComponent } from './admin-centre/admin-centre.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RefereeCentreComponent } from './referee-centre/referee-centre.component';

import { GamesOverviewComponent } from './games-overview/games-overview.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { AddTeamComponent } from './add-team/add-team.component';
import {GamesOverviewComponent} from './games-overview/games-overview.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'example', component: ExampleComponent},
  {path: 'user-detail', component: UserDetailComponent},
  {path: 'team-detail', component: TeamDetailComponent},
  {path: 'change-psw', component: ChangePswComponent},
  {path: 'update-user', component: UpdateUserComponent},
  {path: 'login', component: LoginSiteComponent},
  {path: 'register', component: RegisterSiteComponent},
  {path: 'player-list', component: PlayerListComponent},
  {path: 'admin-centre', component: AdminCentreComponent},
  {path: 'add-user', component: AddUserComponent},
  {path: 'referee-centre', component: RefereeCentreComponent},
  {path: 'games-overview', component: GamesOverviewComponent},
  {path: 'game-detail', component: GameDetailComponent},
  {path: 'add-team', component: AddTeamComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

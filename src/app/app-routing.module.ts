import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExampleComponent } from './example/example.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { ChangePswComponent } from './change-psw/change-psw.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginSiteComponent} from './login-site/login-site.component';
import {RegisterSiteComponent} from './register-site/register-site.component';
import { PlayerListComponent } from './player-list/player-list.component';
import {GamesOverviewComponent} from './games-overview/games-overview.component';

const routes: Routes = [
  {path: 'example', component: ExampleComponent},
  {path: 'user-detail', component: UserDetailComponent},
  {path: 'team-detail', component: TeamDetailComponent},
  {path: 'change-psw', component: ChangePswComponent},
  {path: 'update-user', component: UpdateUserComponent},
  {path: 'login', component: LoginSiteComponent},
  {path: 'register', component: RegisterSiteComponent},
  {path: 'player-list', component: PlayerListComponent},
  {path: '', component: HomePageComponent},
  {path: 'games-overview', component: GamesOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

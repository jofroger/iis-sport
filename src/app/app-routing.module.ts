import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { ExampleComponent } from './example/example.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { ChangePswComponent } from './change-psw/change-psw.component';
import { UpdateUserComponent } from './update-user/update-user.component';


const routes: Routes = [
  {path: "player-detail", component: PlayerDetailComponent},
  {path: "example", component: ExampleComponent},
  {path: "user-detail", component: UserDetailComponent},
  {path: "team-detail", component: TeamDetailComponent},
  {path: "change-psw", component: ChangePswComponent},
  {path: "update-user", component: UpdateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

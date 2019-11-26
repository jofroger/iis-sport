import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerDetailComponent } from './player-detail/player-detail.component'
import { ExampleComponent } from './example/example.component';


const routes: Routes = [
  {path: "player-detail", component: PlayerDetailComponent},
  {path: "example", component: ExampleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

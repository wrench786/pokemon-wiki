import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './component/pokemon-list/pokemon-list.component';
import { DetailsPageComponent } from './component/details-page/details-page.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'pokemon-list',
    pathMatch: 'full',
  },
  {
    path:'pokemon-details',
    component: DetailsPageComponent
  },
  {
    path:'pokemon-list',
    component: PokemonListComponent,
  },
  {
    path:'**',
    redirectTo: 'pokemon-list',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

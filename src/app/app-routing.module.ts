import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

//importato da guida
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];

/*
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
*/

//importato da guida in sosituzione di sopra
@NgModule({
  imports: [RouterModule.forRoot(routes)],  // importa il modulo con delle impostazioni (le rotte che il modulo dovrà usare)
  exports: [RouterModule]   // lo esporta per rendere disponibile a tutta l'applicazione le rout
})
export class AppRoutingModule { }

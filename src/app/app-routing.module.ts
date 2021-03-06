import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HerosComponent } from './components/heros/heros.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

//importato da guida
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },  // pathMatch: 'full' => controlla tutto l'url (verifica che sia tutto vuoto)
  { path: 'heroes', component: HerosComponent },
  { path: 'detail/:id', component: HeroDetailComponent }, //lez7 parte 2
  { path: 'dashboard', component: DashboardComponent },
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
  exports: [RouterModule]   // lo esporta per rendere disponibile a tutta l'applicazione le route
})
export class AppRoutingModule { }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];   //  passo 2

  constructor(private heroService: HeroService) { } //passo 1

  ngOnInit(): void {
    //tips
    console.log('DashboardComponent ngOnInit()');   //craezione di un "servizio"
    this.getHeroes();
  }

  getHeroes(): void {    // chiama il service che abbiamo importato /hero.service) che chiama
    this.heroService.getHeroes().subscribe(dataResponse => { this.heroes = dataResponse.slice(1, 5) }) //graffe con 1 operazione (come qua) sono opzionali
  }

  ngOnDestroy(): void {         //distruzione del "servizio" e liberazione risorse
    console.log('DashboardComponent ngOnInit()');
  }

}

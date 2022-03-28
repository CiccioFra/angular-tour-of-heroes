import { Component, OnInit } from '@angular/core';
import { HEROESMOCKDATA } from 'src/app/mock-data/mock-heros';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-heros',      // quando trovi il tag <app-heros>
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss']
})

export class HerosComponent implements OnInit {
  // 1- hero: string = 'Windstorm';   // inserisco variabile che sarà richiamata in html
  // 2- non la vogliamo più di tipo stringa.. la vogliamo di tipo Hero -> 
  //    -> esce errore -> Posizionarsi col mouse sopra -> fare import
  // 3- secondo erore sull'oggetto: vuole tutti i parametri
  //  hero: Hero = 'Windstorm';   // diventa ->
  // hero: Hero = {
  //   id:1,
  //   name: 'Windstorm'
  // };
  // commentato per fare =>


// heroes: Hero[] = [
//   { id: 11, name: 'Dr Nice' },
//   { id: 12, name: 'Narco' },

//   { id: 20, name: 'Tornado' }
// ];

  // quello che abbiamo fatto è un "mock" dei dati (schianto nel codice una variabile con dati (che poi arriveranno dal server))
  // so quello che arriverà dal server, ne schianto una prova per verificare il codice
  // per pulire il codice, questi dati mockati possiamo metterli in un file esterno, dentro add creo data..

//variabile che passo alla view
// heroes: Hero[] = HEROESMOCKDATA;  // Hero[] semplicemente indica il tipo (è una tipizzazione)
heroes: Hero[] = [];  // Hero[] semplicemente indica il tipo (è una tipizzazione)
selectedHero?: Hero;
//END: variabili che passo alla view

  // values: number[] = [2, 6, 8, 1979];

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
    ) { } // heroService variabile di classe // con private non disponibile all'HTML

  ngOnInit(): void {
    // se non ci fosse darebbe errore in quanto la classe implementa
    // cosa è: un LifeCycle Hook - il componente ha un suo ciclo di vita: 
    //  nasce (ngOnInit) -> cresce (..) -> muore (ngOnDestroy) -> nasce...
    this.getHeroes();
  }

  // inseriamo la funzione dell'html
  onSelect(hero: Hero){
    this.selectedHero = hero;
    this.messageService.add('HeroesComponent: Selected hero id = ' + hero.id);
    this.messageService.add(` and name: ' ${hero.name} '`);  //Stampare una variabile dentro una stringa
  }

  getHeroes(): void { // la funzione viene chiamata all'inizializzazione del componente
    // this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().subscribe(data => {this.heroes = data;  // ora è codice asincrono
    console.log(this.heroes)
    });
  }
}

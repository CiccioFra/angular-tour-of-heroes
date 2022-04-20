import { Component, OnDestroy, OnInit } from '@angular/core';
import { HEROESMOCKDATA } from 'src/app/mock-data/mock-heros';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-heros',      // quando trovi il tag <app-heros>
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss']
})

export class HerosComponent implements OnInit, OnDestroy {
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
//      selectedHero?: Hero;        CODICE MORTO A SEGUITO DI MODIFICA IN HEROS.COMPONENTE.HTML
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

  //  CODICE MORTO A SEGUITO DI MODIFICA IN HEROS.COMPONENTE.HTML
  // // inseriamo la funzione dell'html
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add('HeroesComponent: Selected hero id = ' + hero.id);
  //   this.messageService.add(` and name: ' ${hero.name} '`);  //Stampare una variabile dentro una stringa
  // }

  getHeroes(): void { // la funzione viene chiamata all'inizializzazione del componente
    // this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().subscribe(data => {this.heroes = data;  // ora è codice asincrono
    console.log(this.heroes)
    });
  }

  add(name: string): void {  // aggiunto il 20 aprile, lez9 dopo il div - passo 2
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)  // quando creo unoggetto nuovo { name: name } nome della variavile uguale al nome del valore, si può scrivere { name } // as è un cast a Hero
      .subscribe(hero => {  // "hero" è hero che torna indietro il backend
        this.heroes.push(hero); // viene pushato a video
      });
  }

  delete(hero: Hero): void {  // aggiunto il 20 aprile, lez9 dopo il div - passo 4/5
  //   this.heroes = this.heroes.filter(h => h !== hero);  // classico metodo per cancellare un elemento da una lista
  //   this.heroService.deleteHero(hero.id).subscribe();   // dopo chiama il db per cancellare l'emento dal DB
  // la cambio per cambiare la view dopo aver aggiornato il DB
    this.heroService.deleteHero(hero.id).subscribe(() => {
      this.heroes = this.heroes.filter(h => h !== hero);
    });
 }

  ngOnDestroy(): void {         //distruzione
    console.log('DashboardComponent noOnInit()');
  }
}

import { Injectable } from '@angular/core'; //dal package di nood
import { delay, Observable, of } from 'rxjs';
import { HEROESMOCKDATA } from '../mock-data/mock-heros';
import { Hero } from '../models/hero';
import { MessageService } from './message.service';
// agg lez7   https://angular.io/tutorial/toh-pt6#heroes-and-http
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api  // createDb() di in-memory-data.service.ts

  constructor(
    private messageService: MessageService,     // questa è una injection
    private http: HttpClient,       // Lez7
  ) { }

  getHeroes(): Observable<Hero[]> {

    // const HEROES: Observable<Hero[]> = of(HEROESMOCKDATA).pipe(delay(2000));   DIVENTA =>
    const HEROES= this.http.get<Hero[]>(this.heroesUrl)   // url da chiamare, valore tipo da restituire
      //  HEROES è un Observable di quello che restituesce get del Tipo Hero[]
    
    // this.messageService.add('HeroService: fetched heros'); // lez7 COMMENTATA per pulizia di codice, diventa ->
    this.log('fetchd heroes')

    return HEROES
  }

  getHero(selectId: number): Observable<Hero> {
    const hero = HEROESMOCKDATA.find(h => h.id === selectId)!;  // ! relativa solo  a tipescript, n compilazione js viene torlto
    //  dice al sistema che gatantisce che non sarà null/undefined
    //this.messageService.add(`HeroService: fetched hero id=${selectId}`);  // apici convessi per riconoscere faviabile nel testo (verbatim)
    //commento anche questa. diventa ->
    this.log(`fetchd hero id=${selectId}` )   // ` -> altGr + '
    return of(hero);
    }

     // lez7 guida dice di fare pulizia di codice
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`HeroService: ${message}`);
    }
}

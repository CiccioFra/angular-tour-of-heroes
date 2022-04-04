import { Injectable } from '@angular/core'; //dal package di nood
import { delay, Observable, of } from 'rxjs';
import { HEROESMOCKDATA } from '../mock-data/mock-heros';
import { Hero } from '../models/hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) {}  // questa è una injection
  
  getHeroes(): Observable<Hero[]> {
        // con . subscribe si esplicita il tipo del respons tra < >
    //  return of(HEROESMOCKDATA).pipe(delay(5000));  // of per simulare la riscposta di un server
          // of() è un operatore, restituisce un Observable del "parametro"
          // CONNESSIONE VERA: return this.http.get('url-coi-dati');
  // spacchiamo in 2   return of(HEROESMOCKDATA).pipe(delay(5000));
  const HEROES: Observable<Hero[]> = of(HEROESMOCKDATA).pipe(delay(2000));
  this.messageService.add('HeroService: fetched heros');
  return HEROES
  }
  
 //osservable: come se fosse un podcast. al quale ci si abbona e si ricevono dati nuovi ogni volta che ci sono
 //   HEROS.subscibe(x => ..)  
}

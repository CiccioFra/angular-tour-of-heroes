import { Injectable } from '@angular/core'; //dal package di nood
import { delay, Observable, of } from 'rxjs';
import { HEROESMOCKDATA } from '../mock-data/mock-heros';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() {}
  
  getHeroes(): Observable<Hero[]> {
    // con . subscribe si esplicita il tipo del respons tra < >
    return of(HEROESMOCKDATA).pipe(delay(5000));  // of per simulare la riscposta di un server
    // of() è un operatore, restituisce un Observable del "parametro"
    // CONNESSIONE VERA: return this.http.get('url-coi-dati');
   }
  
   
}

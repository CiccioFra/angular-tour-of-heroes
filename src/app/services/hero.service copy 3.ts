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
    const HEROES: Observable<Hero[]> = of(HEROESMOCKDATA).pipe(delay(2000));
    this.messageService.add('HeroService: fetched heros');
    return HEROES
  }
  
  getHero(selectId: number): Observable<Hero> {
    const hero = HEROESMOCKDATA.find(h => h.id === selectId)!;  // ! relativa solo  a tipescript, in compilazione js viene tolto
    //  dice al sistema che gatantisce che non sarà null/undefined
    this.messageService.add(`HeroService: fetched hero id=${selectId}`);  // apici convessi per riconoscere faviabile nel testo (verbatim)
    return of(hero);
  }
 
}

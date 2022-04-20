import { Injectable } from '@angular/core'; //dal package di nood
import { catchError, delay, Observable, of, tap } from 'rxjs';
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
  private httpOptions = {
    // .. 
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })  // Content-Type Tipo di dato restituito dalla chiamata
  };

  constructor(
    private messageService: MessageService,     // questa è una injection
    private http: HttpClient,       // Lez7
  ) { }

  // getHeroes(): Observable<Hero[]> {
  // // const HEROES: Observable<Hero[]> = of(HEROESMOCKDATA).pipe(delay(2000));   DIVENTA =>
  // const HEROES= this.http.get<Hero[]>(this.heroesUrl)   // url da chiamare, valore tipo da restituire
  //   //  HEROES è un Observable di quello che restituesce get del Tipo Hero[]       
  //          =>
  /** introduciamo catchError() https://angular.io/tutorial/toh-pt6#error-handling */
  // getHeroes(): Observable<Hero[]> {
  //   const HEROES = this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       catchError(error => {
  //         console.log(error);
  //         this.log(`getHeroes failed: ${error.message}`);
  //         let response = [] as Hero[];  // "as"  è un casting
  //         return of(response);  // of() ritorna un Observable di quello che metto tra parentesi
  //         //riceve l'errore -> restituisce un value innocuo
  //       })
  //     );
  //   // this.messageService.add('HeroService: fetched heros'); // lez7 COMMENTATA per pulizia di codice, diventa ->
  //   this.log('fetchd heroes')
  //   return HEROES
  // }    COMMENTATO PER INTRODURRE IL TAP()
  //          =>
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)  // this.heroesUrl = 'api/heroes'
      .pipe(
        // tap(response => this.log('fetched heroes')), // come si scrive normalmente
        tap(_ => this.log('fetched heroes')), // dato che la var response non è usata, si scrive un underscore
        catchError(error => {
          console.error(error);
          this.log(`getHeroes failed: ${error.status}: ${error.body.error} - ${error.message}`);
          let response = [] as Hero[];  // "as"  è un casting
          return of(response);  // of() ritorna un Observable di quello che metto tra parentesi
          //riceve l'errore -> restituisce un value innocuo
          // nella guica https://angular.io/tutorial/toh-pt6#tap-into-the-observable come parametro del catchError()mette qualcosa che restituisce la funzione, noi abbiamo inserito diretamente la funzione
        }),
      );
  }


  // getHero(selectId: number): Observable<Hero> {
  //   const hero = HEROESMOCKDATA.find(h => h.id === selectId)!;  // ! relativa solo  a tipescript, n compilazione js viene torlto
  //   //  dice al sistema che gatantisce che non sarà null/undefined
  //   //this.messageService.add(`HeroService: fetched hero id=${selectId}`);  // apici convessi per riconoscere faviabile nel testo (verbatim)
  //   //commento anche questa. diventa ->
  //   this.log(`fetchd hero id=${selectId}`)   // ` -> altGr + '
  //   return of(hero);
  // }              =>
  /** chiamata al backEnd */
  getHero(selectId: number): Observable<Hero> {
    // return this.http.get<Hero>(this.heroesUrl + '/' + selectId); // prima di fare cose, ci metiamo una pipe
    return this.http.get<Hero>(this.heroesUrl + '/' + selectId)
      .pipe(
        tap(_ => this.log(`fetched hero id = ${selectId}`)),
        catchError(error => {    // catchError() è un operatore 
          // potremmo scrivere semplicemente catchError(_ => of())
          // ma visto che abbiamo un eror, lo usiamo
          //codice come sopra con piccole modifiche
          console.error(error);
          this.log(`getHeroes id=${selectId} failed:  ${error.status}: ${error.body.error} - ${error.message}`);
          return of();  // status proprietà di default di error
          // così è più strutturata e gestisce l'erore, e non si spacca e basta
        })
      );
  }

  /** POST: add a new hero to the server */ //è uguale alla PUT ma ha una "post" // aggiunto il 20 aprile, lez9 dopo il div - passo 3
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(
        // this.handleError<Hero>('addHero')  // "handleError" restituisce la funzione con cui lo sostituiamo..
        error => {
          console.error(error);
          this.log(`addHeroes failed:  ${error.status}: ${error.body.error} - ${error.message}`);
          return of();
        }
      )
    );
  }

  /** DELETE: delete the hero from the server */  // aggiunto il 20 aprile, lez9 - passo 4/5
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(
        // this.handleError<Hero>('deleteHero')  // "handleError" restituisce la funzione con cui lo sostituiamo..
        error => {
          console.error(error);
          this.log(`deleteHero failed:  ${error.status}: ${error.body.error} - ${error.message}`);
          return of();
        }
      )
    );
  }

  /* GET heroes whose name contains search term */  // aggiunto il 20 aprile, lez9 - passo 6
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(
        //this.handleError<Hero[]>('searchHeroes', [])
        error => {
          console.error(error);
          this.log(`searchHeroes failed:  ${error.status}: ${error.body.error} - ${error.message}`);
          return of([]);  // aggiunto [] perchè deve restituire un array
        }
      )
    );
  }

  // lez7 guida dice di fare pulizia di codice
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /** confonde troppo, la togliamo, è opzionale */
  // //copiato dal sito  https://angular.io/tutorial/toh-pt6#error-handling
  // /**
  //  * Handle Http operation that failed.
  //  * Let the app continue.
  //  *
  //  * @param operation - name of the operation that failed
  //  * @param result - optional value to return as the observable result
  //  * @returns value innocuo - innocuous result so that the application keeps working.
  //  */
  // private handleError<T>(operation = 'operation', result?: T) { // questa funzione serve solo all'Observable
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //     //questa funzione può essere richiamata in più punti del codice,
  //     // la funzione è scritta in modo generale
  //   };
  // }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      // catchError(this.handleError<any>('updateHero'))
      catchError(error => {
        console.error(error);
        this.log(`getHeroes failed:  ${error.status}: ${error.body.error} - ${error.message}`);
        return of();
      })
    );
  }
}

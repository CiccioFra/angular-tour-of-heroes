// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-hero-search',
//   templateUrl: './hero-search.component.html',
//   styleUrls: ['./hero-search.component.scss']
// })
// export class HeroSearchComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.scss' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  // private searchTerms = new Subject<string>(); == comment per discorso ngOnInit()

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    // this.searchTerms.next(term); ==> eliminato il corpo di ngOnInit() e modif.. ==>
    this.heroes$=  this.heroService.searchHeroes(term);
  }

  ngOnInit(): void {
    // TROPPO ELABORATA
    // this.heroes$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.heroService.searchHeroes(term)),
    // );     ==>
  }
}
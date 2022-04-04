import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  // @Input() hero?: Hero;   // @Input (è un decoratore) fa parte di '@angular/core', indica che è di tipo input cioè che viene passata da fuori
  hero?: Hero;   // @Input togliamo perche non è piu input

  constructor(
    private route: ActivatedRoute,  // qusto servizio relativo a rotta attiva, conserva info riguardo la rotta, il componente vuol sapere id impostato in rotta
    private heroService: HeroService, //serve a prendere lista heroes
    private location: Location  // necessita import MANUALE import { Location } from '@angular/common'; perchè crede sia un altro..
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  ngOnDestroy(): void {         //distruzione
    console.log('DashboardComponent noOnInit()');
  }

  //creiamo
  getHero(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));  
    //  questa riga di codice serve per prendere dall'url (tutto quello dopo dashboard\) il parametro "id"
    // si mette dentro Number, perchè di default prende tutto come String
    //  in sostituz du Number si può usare il + (fa il cast) ma non accetta il "null"
    console.log('id = ', id)
  }
}

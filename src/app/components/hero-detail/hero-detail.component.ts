import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;   // @Input (è un decoratore) fa parte di '@angular/core', indica che è di tipo input cioè che viene passata da fuori

  constructor() { }

  ngOnInit(): void {
  }

}

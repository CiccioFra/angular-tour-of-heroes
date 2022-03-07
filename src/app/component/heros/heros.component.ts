import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss']
})
export class HerosComponent implements OnInit {
  hero: string = 'Windstorm';   // inserisco variabile che sarà richiamata in html

  constructor() { }

  ngOnInit(): void {
  }

}

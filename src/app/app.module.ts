import { NgModule } from '@angular/core'; // gli import li mette in ordine alfabetico
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HerosComponent } from './component/heros/heros.component';
// con "from senza pattern relativo" la cerca dentro la directory "node_modules"

@NgModule({
  declarations: [
    AppComponent,
    HerosComponent
  ],
  imports: [    // qui si mettono tutti i moduli di cui il mio modulo ha bosogno
                // sopra (import) è il percorso..
    FormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// modul serve: 
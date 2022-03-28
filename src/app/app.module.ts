import { NgModule } from '@angular/core'; // gli import li mette in ordine alfabetico
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HerosComponent } from './components/heros/heros.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MessageComponent } from './components/message/message.component';
import { AppRoutingModule } from './app-routing.module';
// con "from senza pattern relativo" la cerca dentro la directory "node_modules"

@NgModule({
  declarations: [
    AppComponent,
    HerosComponent,
    HeroDetailComponent,
    MessageComponent
  ],
  imports: [    // qui si mettono tutti i moduli di cui il mio modulo ha bosogno
                // sopra (import) è il percorso..
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// modul serve: 
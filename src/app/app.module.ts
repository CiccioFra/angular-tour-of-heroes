import { NgModule } from '@angular/core'; // gli import li mette in ordine alfabetico
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HerosComponent } from './components/heros/heros.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MessageComponent } from './components/message/message.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// con "from senza pattern relativo" la cerca dentro la directory "node_modules"

 // aggiunto con lez7 - per fare chiamate HTTP
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'; // modulo in nodModules
import { InMemoryDataService } from './services/in-memory-data.service';
import { HeroSearchComponent } from './components/hero-search/hero-search.component'; //inizialmente il file manca, lo creiamo

@NgModule({
  declarations: [
    AppComponent,
    HerosComponent,
    HeroDetailComponent,
    MessageComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [    // qui si mettono tutti i moduli di cui il mio modulo ha bosogno
                // sopra (import) è il percorso..
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    // aggiunto con lez7 - per fare chiamate HTTP // per avere a disposizione HttpClient
    HttpClientInMemoryWebApiModule.forRoot(   // con forRoot possiamo configurare il modulo importato
      InMemoryDataService,    // servizio DA CREARE nella cartella services // contiene il db con cui interagiamo
       { dataEncapsulation: false } // restitusce lui un response simulato
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// modul serve: 
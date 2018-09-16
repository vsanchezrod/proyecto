import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Rutas
import { AppRoutingModule } from './app.routes';

// Módulos
import { CoreModule } from './core/core.module';
import { InicioModule } from './inicio/inicio.module';
import { ViajesModule } from './viajes/viajes.module';
import { SalidasModule } from './salidas/salidas.module';
import { CalendarioModule } from './calendario/calendario.module';
import { AcercaDeModule } from './acerca-de/acerca-de.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    InicioModule,
    ViajesModule,
    SalidasModule,
    CalendarioModule,
    AcercaDeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

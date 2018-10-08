import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { InicioComponent } from './inicio.component';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { ListaViajesComponent } from './lista-viajes/lista-viajes.component';
import { ListaSalidasComponent } from './lista-salidas/lista-salidas.component';

// Módulos de componentes de PrimeNG
import { CarouselModule } from 'primeng/carousel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


// Módulo de componentes compartidos
import { CompartidosModule } from '../compartidos/compartidos.module';


@NgModule({
  imports: [
    CommonModule,
    CompartidosModule,
    CarouselModule,
    ProgressSpinnerModule
  ],
  declarations: [
    InicioComponent,
    ListaCategoriasComponent,
    ListaViajesComponent,
    ListaSalidasComponent
  ]
})
export class InicioModule { }

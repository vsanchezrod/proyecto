import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Componentes
import { AcercaDeComponent } from './acerca-de.component';

// Modulos para Componentes de PrimeNG
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';

// Módulos propios
import { CompartidosModule } from '../compartidos/compartidos.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    RatingModule,
    FormsModule,
    CompartidosModule
  ],
  declarations: [
    AcercaDeComponent
  ]
})
export class AcercaDeModule { }

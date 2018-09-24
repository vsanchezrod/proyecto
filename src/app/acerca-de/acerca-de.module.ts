import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Componentes
import { AcercaDeComponent } from './acerca-de.component';

// Modulos para Componentes de PrimeNG
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    RatingModule,
    FormsModule
  ],
  declarations: [
    AcercaDeComponent
  ]
})
export class AcercaDeModule { }

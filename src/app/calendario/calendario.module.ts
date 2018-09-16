import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { CalendarioComponent } from './calendario.component';

// Modulos para Componentes de PrimeNG
import { ScheduleModule } from 'primeng/schedule';

@NgModule({
  imports: [
    CommonModule,
    ScheduleModule
  ],
  declarations: [
    CalendarioComponent
  ]
})
export class CalendarioModule { }

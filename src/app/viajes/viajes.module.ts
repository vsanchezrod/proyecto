import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

// Módulos propios
import { CompartidosModule } from '../compartidos/compartidos.module';

// Componentes
import { ViajesComponent } from './viajes.component';
import { ViajeComponent } from './viaje/viaje.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CompartidosModule
  ],
  declarations: [
    ViajesComponent,
    ViajeComponent
  ]
})
export class ViajesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

// Componentes
import { ViajesComponent } from './viajes.component';
import { ViajeComponent } from './viaje/viaje.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ViajesComponent,
    ViajeComponent
  ]
})
export class ViajesModule { }

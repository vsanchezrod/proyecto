import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

// Módulo propio
import { CompartidosModule } from '../compartidos/compartidos.module';

// Componentes
import { SalidasComponent } from './salidas.component';
import { SalidaComponent } from './salida/salida.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CompartidosModule
  ],
  declarations: [
    SalidasComponent,
    SalidaComponent
  ]
})
export class SalidasModule { }

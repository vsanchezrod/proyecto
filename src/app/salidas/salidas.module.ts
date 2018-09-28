import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

// Componentes
import { SalidasComponent } from './salidas.component';
import { SalidaComponent } from './salida/salida.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    SalidasComponent,
    SalidaComponent
  ]
})
export class SalidasModule { }

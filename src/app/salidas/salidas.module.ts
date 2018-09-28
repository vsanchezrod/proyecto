import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { SalidasComponent } from './salidas.component';
import { SalidaComponent } from './salida/salida.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SalidasComponent,
    SalidaComponent
  ]
})
export class SalidasModule { }

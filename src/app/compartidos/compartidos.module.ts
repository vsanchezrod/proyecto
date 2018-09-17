import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos para Componentes de PrimeNG
import { CardModule } from 'primeng/card';

// Componentes compartidos
import { TarjetaSalidaComponent } from './tarjeta-salida/tarjeta-salida.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule
  ],
  declarations: [
    TarjetaSalidaComponent
  ],
  exports: [
    TarjetaSalidaComponent
  ]
})
export class CompartidosModule { }

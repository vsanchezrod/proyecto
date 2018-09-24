import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos para Componentes de PrimeNG
import { CardModule } from 'primeng/card';

// Componentes compartidos
import { TarjetaSalidaComponent } from './tarjeta-salida/tarjeta-salida.component';
import { TarjetaViajeComponent } from './tarjeta-viaje/tarjeta-viaje.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule
  ],
  declarations: [
    TarjetaSalidaComponent,
    TarjetaViajeComponent
  ],
  exports: [
    TarjetaSalidaComponent,
    TarjetaViajeComponent
  ]
})
export class CompartidosModule { }

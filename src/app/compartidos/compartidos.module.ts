import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos para Componentes de PrimeNG
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

// Módulos
import { FormsModule } from '@angular/forms';

// Componentes compartidos
import { TarjetaSalidaComponent } from './tarjeta-salida/tarjeta-salida.component';
import { TarjetaViajeComponent } from './tarjeta-viaje/tarjeta-viaje.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    RatingModule,
    ButtonModule
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

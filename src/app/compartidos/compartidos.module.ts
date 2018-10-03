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
import { TarjetaOpinionComponent } from './tarjeta-opinion/tarjeta-opinion.component';
import { TarjetaUsuarioComponent } from './tarjeta-usuario/tarjeta-usuario.component';

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
    TarjetaViajeComponent,
    TarjetaOpinionComponent,
    TarjetaUsuarioComponent
  ],
  exports: [
    TarjetaSalidaComponent,
    TarjetaViajeComponent,
    TarjetaOpinionComponent,
    TarjetaUsuarioComponent
  ]
})
export class CompartidosModule { }

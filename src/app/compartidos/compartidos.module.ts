import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos para Componentes de PrimeNG
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

// Módulos
import { FormsModule } from '@angular/forms';

// Componentes compartidos
import { TarjetaSalidaComponent } from './tarjeta-salida/tarjeta-salida.component';
import { TarjetaViajeComponent } from './tarjeta-viaje/tarjeta-viaje.component';
import { TarjetaOpinionComponent } from './tarjeta-opinion/tarjeta-opinion.component';
import { TarjetaUsuarioComponent } from './tarjeta-usuario/tarjeta-usuario.component';
import { TarjetaMensajeComponent } from './tarjeta-mensaje/tarjeta-mensaje.component';
import { ModalCancelacionActividadesComponent } from './modal-cancelacion-actividades/modal-cancelacion-actividades.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    RatingModule,
    ButtonModule,
    MessagesModule,
    MessageModule
  ],
  declarations: [
    TarjetaSalidaComponent,
    TarjetaViajeComponent,
    TarjetaOpinionComponent,
    TarjetaUsuarioComponent,
    TarjetaMensajeComponent,
    ModalCancelacionActividadesComponent,
  ],
  exports: [
    TarjetaSalidaComponent,
    TarjetaViajeComponent,
    TarjetaOpinionComponent,
    TarjetaUsuarioComponent,
    TarjetaMensajeComponent,
    ModalCancelacionActividadesComponent,
  ]
})
export class CompartidosModule { }

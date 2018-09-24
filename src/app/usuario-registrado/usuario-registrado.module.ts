import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos para Componentes de PrimeNG
import { TabMenuModule } from 'primeng/tabmenu';


// Componentes
import { UsuarioRegistradoComponent } from './usuario-registrado.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ActividadesPropuestasComponent } from './actividades-propuestas/actividades-propuestas.component';
import { AmigosComponent } from './amigos/amigos.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { OpinionComponent } from './opinion/opinion.component';

@NgModule({
  imports: [
    CommonModule,
    TabMenuModule
  ],
  declarations: [UsuarioRegistradoComponent, PerfilComponent, CalendarioComponent, ActividadesPropuestasComponent, AmigosComponent, MensajesComponent, OpinionComponent],
  exports: [
    UsuarioRegistradoComponent
  ]
})
export class UsuarioRegistradoModule { }

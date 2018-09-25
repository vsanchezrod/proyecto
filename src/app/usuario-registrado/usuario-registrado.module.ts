import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos para Componentes de PrimeNG
import { TabMenuModule } from 'primeng/tabmenu';
import { ScheduleModule } from 'primeng/schedule';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';

// Componentes
import { UsuarioRegistradoComponent } from './usuario-registrado.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CalendarioUsuarioComponent } from './calendarioUsuario/calendarioUsuario.component';
import { ActividadesPropuestasComponent } from './actividades-propuestas/actividades-propuestas.component';
import { AmigosComponent } from './amigos/amigos.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { OpinionComponent } from './opinion/opinion.component';
import { ActividadNuevaComponent } from './actividades-propuestas/actividad-nueva/actividad-nueva.component';
import { ActividadEditarComponent } from './actividades-propuestas/actividad-editar/actividad-editar.component';

@NgModule({
  imports: [
    CommonModule,
    TabMenuModule,
    ScheduleModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    InputMaskModule,
    FileUploadModule
  ],
  declarations: [
    UsuarioRegistradoComponent,
    PerfilComponent,
    CalendarioUsuarioComponent,
    ActividadesPropuestasComponent,
    AmigosComponent,
    MensajesComponent,
    OpinionComponent,
    ActividadNuevaComponent,
    ActividadEditarComponent
  ],
  exports: [
    UsuarioRegistradoComponent
  ]
})
export class UsuarioRegistradoModule { }

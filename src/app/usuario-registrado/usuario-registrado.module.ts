import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Formularios
import { FormsModule } from '@angular/forms';

// Modulos para Componentes de PrimeNG
import { TabMenuModule } from 'primeng/tabmenu';
import { ScheduleModule } from 'primeng/schedule';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';


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
    CalendarModule,
    FileUploadModule,
    FormsModule,
    MultiSelectModule
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

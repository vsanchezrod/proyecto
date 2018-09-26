import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos para Componentes de PrimeNG
import { TabMenuModule } from 'primeng/tabmenu';
import { ScheduleModule } from 'primeng/schedule';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { RatingModule } from 'primeng/rating';
import { SplitButtonModule } from 'primeng/splitbutton';

// Módulo de componentes compartidos
import { CompartidosModule } from '../compartidos/compartidos.module';

// Servicios
import { MessageService } from 'primeng/api';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    MultiSelectModule,
    CompartidosModule,
    CardModule,
    InputMaskModule,
    RatingModule,
    SplitButtonModule
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
  ],
  providers: [
    MessageService
  ]

})
export class UsuarioRegistradoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos para Componentes de PrimeNG
import { TabMenuModule } from 'primeng/tabmenu';
import { ScheduleModule } from 'primeng/schedule';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SliderModule } from 'primeng/slider';
import { DataScrollerModule } from 'primeng/datascroller';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';

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
import { ActividadesListaComponent } from './actividades-propuestas/actividades-lista/actividades-lista.component';

@NgModule({
  imports: [
    CommonModule,
    TabMenuModule,
    ScheduleModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    CompartidosModule,
    CardModule,
    RatingModule,
    SplitButtonModule,
    SliderModule,
    DataScrollerModule,
    InplaceModule,
    InputMaskModule,
    RadioButtonModule
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
    ActividadesListaComponent
  ],
  exports: [
    UsuarioRegistradoComponent
  ],
  providers: [
    MessageService
  ]

})
export class UsuarioRegistradoModule { }

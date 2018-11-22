import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Rutas
import { RouterModule } from '@angular/router';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { AdministradorComponent } from './administrador.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { OpinionesComponent } from './opiniones/opiniones.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ActividadesAdministradorListaComponent } from './actividades/actividades-administrador-lista/actividades-administrador-lista.component';
import { ActividadesAdministradorNuevaComponent } from './actividades/actividades-administrador-nueva/actividades-administrador-nueva.component';

// Módulos para Componentes de PrimeNG
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { DataScrollerModule } from 'primeng/datascroller';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';

// Módulos propios
import { CompartidosModule } from '../compartidos/compartidos.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DataScrollerModule,
    CompartidosModule,
    MultiSelectModule,
    RatingModule,
    SliderModule,
    CalendarModule,
    AccordionModule
  ],
  declarations: [
    AdministradorComponent,
    ActividadesComponent,
    UsuariosComponent,
    OpinionesComponent,
    EstadisticasComponent,
    CategoriasComponent,
    ActividadesAdministradorListaComponent,
    ActividadesAdministradorNuevaComponent
  ]
})
export class AdministradorModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { AdministradorComponent } from './administrador.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { OpinionesComponent } from './opiniones/opiniones.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { CategoriasComponent } from './categorias/categorias.component';

// Modulos para Componentes de PrimeNG
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdministradorComponent,
    ActividadesComponent,
    UsuariosComponent,
    OpinionesComponent,
    EstadisticasComponent,
    CategoriasComponent
  ]
})
export class AdministradorModule { }

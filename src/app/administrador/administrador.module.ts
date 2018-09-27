import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

// Componentes
import { AdministradorComponent } from './administrador.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { OpinionesComponent } from './opiniones/opiniones.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

// Modulos para Componentes de PrimeNG


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    AdministradorComponent,
    ActividadesComponent,
    UsuariosComponent,
    OpinionesComponent,
    EstadisticasComponent
  ]
})
export class AdministradorModule { }

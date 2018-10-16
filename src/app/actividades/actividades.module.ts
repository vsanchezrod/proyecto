import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

// Módulo propio
import { CompartidosModule } from '../compartidos/compartidos.module';

// Componentes
import { ActividadesComponent } from './actividades.component';
import { ActividadComponent } from './actividad/actividad.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CompartidosModule
  ],
  declarations: [
    ActividadComponent,
    ActividadesComponent
  ]
})
export class ActividadesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulo de las rutas
import { RouterModule } from '@angular/router';


// Componentes
import { CabeceraComponent } from './cabecera/cabecera.component';
import { MenuComponent } from './menu/menu.component';
import { PrincipalComponent } from './principal/principal.component';
import { PieComponent } from './pie/pie.component';
import { InfoSesionMenuComponent } from './menu/info-sesion-menu/info-sesion-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    CabeceraComponent,
    MenuComponent,
    PrincipalComponent,
    PieComponent,
    InfoSesionMenuComponent
  ],
  exports: [
    CabeceraComponent,
    MenuComponent,
    PrincipalComponent,
    PieComponent
  ]
})
export class CoreModule { }

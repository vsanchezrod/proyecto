import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos para Componentes de PrimeNG
import { TabMenuModule } from 'primeng/tabmenu';


// Componentes
import { UsuarioRegistradoComponent } from './usuario-registrado.component';

@NgModule({
  imports: [
    CommonModule,
    TabMenuModule
  ],
  declarations: [UsuarioRegistradoComponent],
  exports: [
    UsuarioRegistradoComponent
  ]
})
export class UsuarioRegistradoModule { }

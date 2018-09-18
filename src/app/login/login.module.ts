import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulo de las rutas
import { RouterModule } from '@angular/router';

// Componentes
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
})
export class LoginModule { }

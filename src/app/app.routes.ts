import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes importados
import { InicioComponent } from './inicio/inicio.component';
import { ViajesComponent } from './viajes/viajes.component';
import { SalidasComponent } from './salidas/salidas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { LoginComponent } from './login/login/login.component';
import { RegistroComponent } from './login/registro/registro.component';
import {UsuarioRegistradoComponent} from './usuario-registrado/usuario-registrado.component';
import {PerfilComponent} from './usuario-registrado/perfil/perfil.component';
import {CalendarioUsuarioComponent} from './usuario-registrado/calendarioUsuario/calendarioUsuario.component';
import {ActividadesPropuestasComponent} from './usuario-registrado/actividades-propuestas/actividades-propuestas.component';
import {AmigosComponent} from './usuario-registrado/amigos/amigos.component';
import {MensajesComponent} from './usuario-registrado/mensajes/mensajes.component';
import {OpinionComponent} from './usuario-registrado/opinion/opinion.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'viajes', component: ViajesComponent },
  { path: 'salidas', component: SalidasComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'acerca', component: AcercaDeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  {
    path: 'usuario',
    component: UsuarioRegistradoComponent,
    children: [
      { path: 'perfil', component: PerfilComponent },
      { path: 'calendario', component: CalendarioUsuarioComponent },
      { path: 'actividades', component: ActividadesPropuestasComponent },
      { path: 'amigos', component: AmigosComponent },
      { path: 'mensajes', component: MensajesComponent },
      { path: 'opiniones', component: OpinionComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'calendario' }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

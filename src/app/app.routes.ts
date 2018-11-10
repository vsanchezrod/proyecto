import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes importados
import { InicioComponent } from './inicio/inicio.component';
import { ViajesComponent } from './viajes/viajes.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { LoginComponent } from './login/login/login.component';
import { RegistroComponent } from './login/registro/registro.component';
import { UsuarioRegistradoComponent } from './usuario-registrado/usuario-registrado.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { ActividadComponent } from './actividades/actividad/actividad.component';
import { ViajeComponent } from './viajes/viaje/viaje.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

// Rutas de Usuario
import { USUARIO_RUTAS } from './usuario-registrado/usuario-registrado.routes';

// Rutas de administrador
import { ADMINISTRADOR_RUTAS } from './administrador/administrador.routes';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'viajes', component: ViajesComponent },
  { path: 'viaje/:id', component: ViajeComponent },
  { path: 'salidas', component: ActividadesComponent },
  { path: 'salidas/:id', component: ActividadesComponent },
  { path: 'salida/:id', component: ActividadComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'acerca', component: AcercaDeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  {
    path: 'usuario',
    component: UsuarioRegistradoComponent,
    children: USUARIO_RUTAS
  },
  {
    path: 'admin',
    component: AdministradorComponent,
    children: ADMINISTRADOR_RUTAS
  },
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

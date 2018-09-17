import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes importados
import { InicioComponent } from './inicio/inicio.component';
import { ViajesComponent } from './viajes/viajes.component';
import { SalidasComponent } from './salidas/salidas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'viajes', component: ViajesComponent },
  { path: 'salidas', component: SalidasComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'acerca', component: AcercaDeComponent },
  { path: 'login', component: LoginComponent},
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

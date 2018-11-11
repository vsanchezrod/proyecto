import { Routes } from '@angular/router';

// Componentes que cargan las rutas
import { PerfilComponent } from './perfil/perfil.component';
import { CalendarioUsuarioComponent } from './calendarioUsuario/calendarioUsuario.component';
import { ActividadesPropuestasComponent } from './actividades-propuestas/actividades-propuestas.component';
import { AmigosComponent } from './amigos/amigos.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { OpinionComponent } from './opinion/opinion.component';
import { ActividadNuevaComponent } from './actividades-propuestas/actividad-nueva/actividad-nueva.component';
import { ActividadesListaComponent } from './actividades-propuestas/actividades-lista/actividades-lista.component';


export const USUARIO_RUTAS: Routes = [
    { path: 'perfil', component: PerfilComponent },
    { path: 'calendario', component: CalendarioUsuarioComponent },
    {
      path: 'actividades',
      component: ActividadesPropuestasComponent,
      children: [
        { path: 'lista', component: ActividadesListaComponent},
        { path: 'nueva', component: ActividadNuevaComponent},
        { path: 'editar/:id', component: ActividadNuevaComponent},
        { path: '**', pathMatch: 'full', redirectTo: 'lista' }
      ]
    },
    { path: 'amigos', component: AmigosComponent },
    { path: 'mensajes', component: MensajesComponent },
    { path: 'opiniones', component: OpinionComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'calendario' }
];


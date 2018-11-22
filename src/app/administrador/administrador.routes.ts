import { Routes } from '@angular/router';

// Componentes que cargan las rutas
import { ActividadesComponent } from './actividades/actividades.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { OpinionesComponent} from './opiniones/opiniones.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ActividadesAdministradorListaComponent } from './actividades/actividades-administrador-lista/actividades-administrador-lista.component';
import { ActividadesAdministradorNuevaComponent } from './actividades/actividades-administrador-nueva/actividades-administrador-nueva.component';

export const ADMINISTRADOR_RUTAS: Routes = [
  { path: 'actividades',
    component: ActividadesComponent,
    children: [
      { path: 'lista', component: ActividadesAdministradorListaComponent},
      { path: 'nueva', component: ActividadesAdministradorNuevaComponent},
      { path: 'editar/:id', component: ActividadesAdministradorNuevaComponent},
      { path: '**', pathMatch: 'full', redirectTo: 'lista' }
    ]
  },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'opiniones', component: OpinionesComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'actividades' }
];


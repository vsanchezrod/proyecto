import { Routes } from '@angular/router';

// Componentes que cargan las rutas
import { ActividadesComponent } from './actividades/actividades.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { OpinionesComponent} from './opiniones/opiniones.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { CategoriasComponent } from './categorias/categorias.component';

export const ADMINISTRADOR_RUTAS: Routes = [
  { path: 'actividades', component: ActividadesComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'opiniones', component: OpinionesComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'actividades' }
];


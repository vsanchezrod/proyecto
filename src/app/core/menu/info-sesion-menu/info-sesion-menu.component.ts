import { Component, OnInit } from '@angular/core';

// Componentes de PrimeNG
import { MenuItem } from 'primeng/api';

// Servicio
import { UsuarioSesionService } from '../../../servicios/usuario-sesion.service';

// Rutas
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-sesion-menu',
  templateUrl: './info-sesion-menu.component.html',
  styleUrls: ['./info-sesion-menu.component.css']
})
export class InfoSesionMenuComponent implements OnInit {

  items: MenuItem[];

  constructor(private usuarioSesionService: UsuarioSesionService,
              private router: Router) { }

  ngOnInit() {

    this.items = [
      {
        label: 'Actividades',
        icon: 'pi pi-fw pi-calendar',
        routerLink: 'admin/actividades'
      },

      {
        label: 'Categorias',
        icon: 'pi pi-fw pi-calendar',
        routerLink: 'admin/categorias'
      },

      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-users',
        routerLink: 'admin/usuarios'
      },

      {
        label: 'Gestión de opiniones',
        icon: 'pi pi-fw pi-bars',
        routerLink: 'admin/opiniones'
      },

      {
        label: 'Estadísticas',
        icon: 'pi pi-fw pi-cog',
        routerLink: 'admin/estadisticas'
      },

      {separator: true},

      {
        label: 'Volver',
        icon: 'pi pi-fw pi-times',
        routerLink: 'inicio'
      }
    ];
  }

  // TO DO - TERMINAR
  public logout(): void {
    this.usuarioSesionService.logout();
    this.router.navigate(['login']);
  }

}

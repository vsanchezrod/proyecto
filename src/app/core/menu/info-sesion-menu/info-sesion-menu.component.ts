import { Component, OnInit } from '@angular/core';

// Componentes de PrimeNG
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-info-sesion-menu',
  templateUrl: './info-sesion-menu.component.html',
  styleUrls: ['./info-sesion-menu.component.css']
})
export class InfoSesionMenuComponent implements OnInit {

  usuarioRegistrado: boolean;

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.usuarioRegistrado = true;

    this.items = [
      {
        label: 'Actividades',
        icon: 'pi pi-fw pi-calendar',
        routerLink: 'admin/actividades'
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

}

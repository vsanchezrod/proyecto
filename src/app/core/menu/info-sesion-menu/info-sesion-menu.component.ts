import { Component, OnInit, Input } from '@angular/core';

// Componentes de PrimeNG
import { MenuItem } from 'primeng/api';

// Servicio
import { UsuarioSesionService } from '../../../servicios/usuario-sesion.service';

// Rutas
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.model';

@Component({
  selector: 'app-info-sesion-menu',
  templateUrl: './info-sesion-menu.component.html',
  styleUrls: ['./info-sesion-menu.component.css']
})
export class InfoSesionMenuComponent implements OnInit {

  // @Input() avatar: string;
  public usuario: Usuario;
  public usuarioAdministrador: boolean;
  public itemsAdmin: MenuItem[];
  public itemsUsuario: MenuItem[];

  constructor(private usuarioSesionService: UsuarioSesionService,
              private router: Router) { }

  ngOnInit() {

    this.usuarioAdministrador = false;

    this.usuarioSesionService.obtenerUsuario$().subscribe( (usuario: Usuario) => {
      this.usuario = usuario;
      // console.log('INFOSESION: Usuario: ', this.usuario);

      if (this.usuario != null && this.usuario.roles.includes('administrador')) {
        this.usuarioAdministrador = true;
        // console.log('INFOSESSION: ES ADMIN');
      }
    });

    this.itemsUsuario = [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        routerLink: 'usuario/perfil'
      },

      {
        label: 'Calendario',
        icon: 'pi pi-fw pi-calendar',
        routerLink: 'usuario/calendario'
      },

      {
        label: 'Actividades Propuestas',
        icon: 'pi pi-tags',
        routerLink: 'usuario/actividades'
      },

      {
        label: 'Amigos',
        icon: 'pi pi-users',
        routerLink: 'usuario/amigos'
      },

      {
        label: 'Mensajes',
        icon: 'pi pi-envelope',
        routerLink: 'usuario/mensajes'
      },

      {
        label: 'Opiniones',
        icon: 'pi pi-comments',
        routerLink: 'usuario/opiniones'
      }
    ];

    this.itemsAdmin = [
      {
        label: 'Actividades',
        icon: 'pi pi-fw pi-calendar',
        routerLink: 'admin/actividades'
      },

      {
        label: 'Categorias',
        icon: 'pi pi-sitemap',
        routerLink: 'admin/categorias'
      },

      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-users',
        routerLink: 'admin/usuarios'
      },

      {
        label: 'Gestión de opiniones',
        icon: 'pi pi-comments',
        routerLink: 'admin/opiniones'
      },

      {
        label: 'Estadísticas',
        icon: 'pi pi-chart-bar',
        routerLink: 'admin/estadisticas'
      }
    ];
  }

  // TO DO - TERMINAR
  public logout(): void {
    this.usuarioSesionService.logout();
    this.router.navigate(['/inicio']);
  }

}

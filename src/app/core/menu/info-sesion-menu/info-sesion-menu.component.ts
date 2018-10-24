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
  public itemsAdmin: MenuItem[];
  public itemsUsuario: MenuItem[];
  
  constructor(private usuarioSesionService: UsuarioSesionService,
              private router: Router) { }

  ngOnInit() {

    this.usuarioSesionService.obtenerUsuario$().subscribe( (usuario: Usuario) => {
      this.usuario = usuario;
      console.log('MENUCOMP: Usuario: ', this.usuario);
    });

    this.itemsUsuario = [
      {
        label: 'Perfil',
        icon: 'pi pi-fw pi-calendar',
        routerLink: 'usuario/perfil'
      },

      {
        label: 'Calendario',
        icon: 'pi pi-fw pi-calendar',
        routerLink: 'usuario/calendario'
      },

      {
        label: 'Actividades Propuestas',
        icon: 'pi pi-fw pi-users',
        routerLink: 'usuario/actividades'
      },

      {
        label: 'Amigos',
        icon: 'pi pi-fw pi-bars',
        routerLink: 'usuario/amigos'
      },

      {
        label: 'Opiniones',
        icon: 'pi pi-fw pi-cog',
        routerLink: 'usuario/opiniones'
      },

      {separator: true},

      {
        // IMPLEMENTAR QUE SE DESLOGE
        label: 'Logout',
        icon: 'pi pi-fw pi-times',
        routerLink: 'inicio'
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
        // IMPLEMENTAR QUE SE DESLOGE
        label: 'Logout',
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

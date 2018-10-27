import { Component, OnInit, OnDestroy } from '@angular/core';

// Componentes de PrimeNG
import { MenuItem } from 'primeng/api';

// Servicio
import { UsuarioSesionService } from '../../../servicios/usuario-sesion.service';

// Rutas
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-sesion-menu',
  templateUrl: './info-sesion-menu.component.html',
  styleUrls: ['./info-sesion-menu.component.css']
})
export class InfoSesionMenuComponent implements OnInit, OnDestroy {

  public usuario: Usuario;
  public itemsAdmin: MenuItem[];
  public itemsUsuario: MenuItem[];
  private suscripcionObtenerUsuarioLogado: Subscription;

  constructor(public usuarioSesionService: UsuarioSesionService,
              private router: Router) { }

  ngOnInit() {

    console.log('INFOSESSION: ONINIT');

    this.suscripcionObtenerUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;
      }
    );

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

  ngOnDestroy(): void {
    console.log('INFOSESSION: ONDESTROY');
    this.suscripcionObtenerUsuarioLogado.unsubscribe();
  }

  public logout(): void {
    this.usuarioSesionService.logout();
    this.router.navigate(['/inicio']);
  }



}

import { Component, OnInit, OnDestroy } from '@angular/core';

// Componentes de PrimeNG
import { MenuItem } from 'primeng/api';

// Servicio
import { UsuarioSesionService } from '../../../servicios/usuario-sesion.service';
import { UsuariosService } from '../../../servicios/usuarios.service';

// Rutas
import { Router } from '@angular/router';

// Modelos
import { Usuario } from '../../../modelos/usuario.model';
import { Total } from '../../../modelos/total.model';

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
  public numeroMensajesSinLeer: number;

  private suscripcionObtenerUsuarioLogado: Subscription;
  private subscripcionObtenerMensajes: Subscription;

  constructor(public usuarioSesionService: UsuarioSesionService,
              private usuariosService: UsuariosService,
              private router: Router) { }

  ngOnInit() {

    console.log('INFOSESSION: ONINIT');

    this.suscripcionObtenerUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;

        this.subscripcionObtenerMensajes = this.usuariosService.obtenerNumeroMensajesNoLeidosDeUsuario(this.usuario.id).subscribe(
          (total: Total) => {
            this.numeroMensajesSinLeer = total.total;
          }
        );

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
    this.subscripcionObtenerMensajes.unsubscribe();
  }

  public logout(): void {
    this.usuarioSesionService.logout();
    this.router.navigate(['/inicio']);
  }

  public verMensajes(): void {
    this.router.navigate(['/usuario/mensajes']);
  }
}

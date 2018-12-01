import { Component, OnInit } from '@angular/core';

// Import primeng
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-usuario-registrado',
  templateUrl: './usuario-registrado.component.html',
  styleUrls: ['./usuario-registrado.component.css']
})
export class UsuarioRegistradoComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Perfil', icon: 'pi pi-user', routerLink: 'perfil'},
      {label: 'Calendario', icon: 'pi pi-fw pi-calendar', routerLink: 'calendario'},
      {label: 'Mis actividades', icon: 'pi pi-tags', routerLink: 'actividades'},
      {label: 'Amigos', icon: 'pi pi-users', routerLink: 'amigos'},
      {label: 'Mensajes', icon: 'pi pi-envelope', routerLink: 'mensajes'},
      {label: 'Opiniones', icon: 'pi pi-comments', routerLink: 'opiniones'}
    ];
  }
}

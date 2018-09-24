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
      {label: 'Perfil', icon: 'fa fa-fw fa-support', routerLink: 'perfil'},
      {label: 'Calendario', icon: 'fa fa-fw fa-calendar', routerLink: 'calendario'},
      {label: 'Actividades propuestas', icon: 'fa fa-fw fa-book', routerLink: 'actividades'},
      {label: 'Amigos', icon: 'fa fa-fw fa-twitter', routerLink: 'amigos'},
      {label: 'Mensajes', icon: 'fa fa-fw fa-twitter', routerLink: 'mensajes'},
      {label: 'Opiniones', icon: 'fa fa-fw fa-support', routerLink: 'opiniones'}
    ];
  }

}

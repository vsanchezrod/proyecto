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
      {label: 'Perfil', icon: 'fa fa-fw fa-support'},
      {label: 'Calendario', icon: 'fa fa-fw fa-calendar'},
      {label: 'Actividades propuestas', icon: 'fa fa-fw fa-book'},
      {label: 'Amigos', icon: 'fa fa-fw fa-twitter'},
      {label: 'Mensajes', icon: 'fa fa-fw fa-twitter'},
      {label: 'Opiniones', icon: 'fa fa-fw fa-support'}
    ];
  }

}

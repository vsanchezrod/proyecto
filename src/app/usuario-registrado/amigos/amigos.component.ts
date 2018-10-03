import { Component, OnInit } from '@angular/core';

import { Usuario} from '../../modelos/usuario.model';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.css']
})
export class AmigosComponent implements OnInit {

  listaContactos: Array<Usuario>;

  constructor() { }

  ngOnInit() {

    this.listaContactos = [];
  }

}

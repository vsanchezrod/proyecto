import { Component, OnInit } from '@angular/core';

import { Salida } from '../../modelos/salida.model';
import {Coordenada} from '../../modelos/coordenada.model';

@Component({
  selector: 'app-lista-salidas',
  templateUrl: './lista-salidas.component.html',
  styleUrls: ['./lista-salidas.component.css']
})
export class ListaSalidasComponent implements OnInit {

  listaSalidas: Array<Salida>;

  constructor() { }

  ngOnInit() {

    this.listaSalidas = [
      {
        nombre: 'Hinojosa de San Vicente',
        categorias: ['lala1', 'lala2'],
        descripcion: 'lililililili',
        nivel: 1,
        distancia: 15,
        fechaInicio: new Date(),
        imagen: 'asdada',
        puntoEncuentro: {
          latitud: 0,
          longitud: 0
        }
      },
      {
        nombre: 'LALALALLA2',
        categorias: ['lala1', 'lala2'],
        descripcion: 'lililililili',
        nivel: 3,
        distancia: 15,
        fechaInicio: new Date(),
        imagen: 'asdada',
        puntoEncuentro: {
          latitud: 0,
          longitud: 0
        }
      },
      {
        nombre: 'LALALAL 3',
        categorias: ['lala1', 'lala2'],
        descripcion: 'lililililili',
        nivel: 2,
        distancia: 50,
        fechaInicio: new Date(),
        imagen: 'asdada',
        puntoEncuentro: {
          latitud: 0,
          longitud: 0
        }
      }
    ];
  }

}


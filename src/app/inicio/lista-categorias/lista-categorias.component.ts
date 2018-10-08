import { Component, OnInit } from '@angular/core';

import { CategoriasService } from '../../servicios/categorias.service';

import { Categoria } from '../../modelos/categoria.model';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit {

  public listaCategorias: Array<Categoria>

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit() {

    this.categoriasService.obtenerListaCategorias().subscribe(response => {
      console.log('Las categorias son: ', response.body);
      this.listaCategorias = response.body;
      }
    );
  }

}

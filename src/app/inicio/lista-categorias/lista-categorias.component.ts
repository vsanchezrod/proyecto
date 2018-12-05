import { Component, OnInit, OnDestroy } from '@angular/core';

// Servicios
import { CategoriasService } from '../../servicios/categorias.service';

// Modelos de datos
import { Categoria } from '../../modelos/categoria.model';

// Rutas
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit, OnDestroy {

  public listaCategorias: Array<Categoria>;

  private subscripcionListaCategorias: Subscription;

  constructor(private categoriasService: CategoriasService,
              private router: Router) {}

  ngOnInit() {

    this.subscripcionListaCategorias = this.categoriasService.obtenerListaCategorias$().subscribe(categorias => {
      this.listaCategorias = categorias;
      }
    );
  }

  ngOnDestroy() {
    this.subscripcionListaCategorias.unsubscribe();
  }

  public cargarActividades(idCategoria: string): void {
    this.router.navigate(['/busqueda'], { queryParams: { categoria: idCategoria }});
  }

}

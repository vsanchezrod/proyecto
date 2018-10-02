import { Component, OnInit } from '@angular/core';

// Servicios
import { CategoriasService } from '../../servicios/categorias.service';

// Modelos
import { Categoria } from '../../modelos/categoria.model';

// Formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  listaCategorias: Array<Categoria>;

  formularioCategoria: FormGroup;

  constructor(private categoriaService: CategoriasService) { }

  ngOnInit() {

    this.categoriaService.obtenerListaCategorias().subscribe(response => {
      this.listaCategorias = response.body;
    });

    this.formularioCategoria = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      'descripcion': new FormControl('', Validators.required),
      'imagen': new FormControl('', Validators.required)
    });
  }

  // Método para crear y guardar una categoria nueva en la BBDD
  public crearCategoria() {
    console.log(this.formularioCategoria.value);
    this.categoriaService.crearCategoria(this.formularioCategoria.value).subscribe( response => {
      console.log('Respuesta: ' + response.status);
      console.log(this.formularioCategoria);
    });
  }

}

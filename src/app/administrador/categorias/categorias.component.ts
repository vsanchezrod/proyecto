import { Component, OnInit } from '@angular/core';

// Servicios
import { CategoriasService } from '../../servicios/categorias.service';
import { InteresesService } from '../../servicios/intereses.service';

// Modelos
import { Categoria } from '../../modelos/categoria.model';
import { Interes } from '../../modelos/interes.model';

// Formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  listaCategorias: Array<Categoria>;
  listaIntereses: Array<Interes>;

  formularioCategoria: FormGroup;
  formularioIntereses: FormGroup;

  constructor(private categoriaService: CategoriasService,
              private interesesService: InteresesService) { }

  ngOnInit() {

    this.categoriaService.obtenerListaCategorias().subscribe(response => {
      this.listaCategorias = response.body;
    });

    this.interesesService.obtenerListaIntereses().subscribe(response => {
      this.listaIntereses = response.body;
    });


    this.formularioCategoria = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      'descripcion': new FormControl('', Validators.required),
      'imagen': new FormControl('', Validators.required)
    });

    this.formularioIntereses = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      'descripcion': new FormControl('', Validators.required),
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

  // Método para crear y guardar un nuevo interés y mostrarlo en el formulario de registro
  public crearInteres() {
    console.log(this.formularioIntereses.value);
    this.interesesService.crearInteres(this.formularioIntereses.value).subscribe( response => {
      this.listaIntereses = response.body;
    });
  }
}

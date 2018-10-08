import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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

  imagen: string;
  cargando: boolean;

  constructor(private categoriaService: CategoriasService) { }

  ngOnInit() {

    this.categoriaService.obtenerListaCategorias().subscribe(response => {
      this.listaCategorias = response.body;
    });

    this.formularioCategoria = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      'descripcion': new FormControl('', Validators.required)
    });

  }

  public crearCategoria(datos): void {
    console.log(this.formularioCategoria.value);

    this.categoriaService.crearCategoria(datos).subscribe( response => {
      console.log('Respuesta: ' + response.status);
      console.log(this.formularioCategoria);
    });
  }

  // Método que maneja el upload de los archivos subidos
  public changeListener(evento: Event): void {
    console.log(evento);

    const inputValue: any = evento.target;
    const fichero: File = inputValue.files[0];
    console.log('file:', fichero);

    const fileReader: FileReader = new FileReader();

    fileReader.onerror = (event) => {
      console.error('Error leyendo fichero:', event);
      this.cargando = false;
    };

    fileReader.onabort = () => {
      this.cargando = false;
    };

    fileReader.onloadend = (event) => {
      this.imagen = fileReader.result;
      console.log('imagen! =====>>>>', this.imagen);
      this.cargando = false;
      this.formularioCategoria.addControl('imagen', new FormControl(this.imagen, Validators.required));

    };

    fileReader.onprogress = (progressEvent) => {
      console.log('progressEvent: ', progressEvent);
    };

    fileReader.readAsDataURL(fichero);
    this.cargando = true;

  }

}

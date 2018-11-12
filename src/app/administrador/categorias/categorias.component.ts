import {Component, OnInit, OnDestroy } from '@angular/core';

// Servicios
import { CategoriasService } from '../../servicios/categorias.service';

// Modelos
import { Categoria } from '../../modelos/categoria.model';

// Formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Modelos
import { Usuario } from '../../modelos/usuario.model';

// Servicios
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit, OnDestroy {

  public usuario: Usuario;
  public listaCategorias: Array<Categoria>;
  public formularioCategoria: FormGroup;
  public imagen: string | ArrayBuffer;
  public cargando: boolean;

  private subscripcionUsuarioLogado: Subscription;

  constructor(private categoriasService: CategoriasService,
              private usuarioSesionService: UsuarioSesionService) { }

  ngOnInit() {

    // Obtener el usuario logado
    this.subscripcionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe( (usuario: Usuario) => {
      this.usuario = usuario;
    });

    this.obtenerListaCategorias();

    this.formularioCategoria = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      'descripcion': new FormControl('', Validators.required)
    });

  }

  ngOnDestroy() {
    this.subscripcionUsuarioLogado.unsubscribe();
  }

  public crearCategoria(datos: Categoria): void {
    console.log(this.formularioCategoria.value);

    this.categoriasService.crearCategoria(datos).subscribe( response => {
      console.log('CategoriasComp:CrearCategoria:Respuesta: ' + response.status);
      this.obtenerListaCategorias();
    });
    this.formularioCategoria.reset();
  }

  public borrarCategoria(idCategoria: string): void {
    this.categoriasService.borrarCategoria(idCategoria).subscribe( response => {
      console.log('CategoriasComp:BorrarCategoria:Respuesta: ' + response.status);
      this.obtenerListaCategorias();
    });
  }


  // Método que maneja el upload de los archivos subidos
  public changeListener(evento: Event): void {
    const inputValue: any = evento.target;
    const fichero: File = inputValue.files[0];
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
      this.cargando = false;
      if (this.formularioCategoria.contains('imagen')) {
        this.formularioCategoria.removeControl('imagen');
      }
      this.formularioCategoria.addControl('imagen', new FormControl(this.imagen, Validators.required));

    };

    fileReader.onprogress = (progressEvent) => {
      console.log('progressEvent: ', progressEvent);
    };

    fileReader.readAsDataURL(fichero);
    this.cargando = true;

  }

  private obtenerListaCategorias(): void {
     this.categoriasService.obtenerListaCategorias$().subscribe(
      categorias => {
        this.listaCategorias = categorias;
      }
    );
  }


}

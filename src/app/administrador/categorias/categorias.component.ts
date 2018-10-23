import {Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public usuario: Usuario;
  public listaCategorias: Array<Categoria>;
  public formularioCategoria: FormGroup;
  public imagen: string | ArrayBuffer;
  public cargando: boolean;

  private accessToken: string;

  constructor(private categoriasService: CategoriasService,
              private usuarioSesionService: UsuarioSesionService) { }

  ngOnInit() {

    // Obtener token de acceso
    this.usuarioSesionService.obtenerAccessToken$().subscribe( (accessToken: string) => {
      this.accessToken = accessToken;
    });

    // Obtener el usuario logado
    this.usuarioSesionService.obtenerUsuario$().subscribe( (usuario: Usuario) => {
      this.usuario = usuario;
    });


    this.categoriasService.obtenerListaCategorias$().subscribe(categorias => {
      this.listaCategorias = categorias;
      }
    );

    this.formularioCategoria = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      'descripcion': new FormControl('', Validators.required)
    });

  }

  public crearCategoria(datos): void {
    console.log(this.formularioCategoria.value);

    this.categoriasService.crearCategoria(datos, this.accessToken).subscribe( response => {
      console.log('CategoriasComp:CrearCategoria:Respuesta: ' + response.status);
    });
  }

  public borrarCategoria(idCategoria): void {
    this.categoriasService.borrarCategoria(idCategoria, this.accessToken).subscribe( response => {
      console.log('CategoriasComp:BorrarCategoria:Respuesta: ' + response.status);

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

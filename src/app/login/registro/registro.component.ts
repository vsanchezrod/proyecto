import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

// Formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Rutas
import { Router } from '@angular/router';

// Servicios
import { ProvinciasService } from '../../servicios/provincias.service';
import { CategoriasService } from '../../servicios/categorias.service';
import { UsuariosService } from '../../servicios/usuarios.service';

// Modelos
import { Provincia } from '../../modelos/provincia.model';
import { Categoria } from '../../modelos/categoria.model';
import { Usuario } from '../../modelos/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public formularioRegistro: FormGroup;
  public rangoAnios: string;

  public listaProvincias: Array<Provincia> = [];
  public listaIntereses: Array<Categoria> = [];

  public imagenAvatar: string | ArrayBuffer;
  public progreso: number;
  public mostrarSpinner: boolean;
  public esNecesarioRellenarTodosLosCampos: boolean;

  private anioDesde = 1920;
  private edadMinima = 16;

  constructor(private provinciasService: ProvinciasService,
              private categoriasService: CategoriasService,
              private usuariosService: UsuariosService,
              private router: Router) {}

  ngOnInit() {

    this.esNecesarioRellenarTodosLosCampos = false;
    const anioHasta: string = moment().subtract(this.edadMinima, 'years').format('YYYY');

    this.rangoAnios = `${this.anioDesde}:${anioHasta}`;

    this.provinciasService.obtenerProvincias()
      .subscribe(response => {
        this.listaProvincias = response.body;
      });

    this.categoriasService.obtenerListaCategorias$()
      .subscribe( response => {
         this.listaIntereses = response;
    });

    this.formularioRegistro = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      'confirmacionPassword': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      'fechaNacimiento': new FormControl('', Validators.required),
      'sexo': new FormControl('', Validators.required),
      'provincia': new FormControl('', Validators.required),
      'info': new FormControl(''),
      'intereses': new FormControl(),
      'terminos': new FormControl('', Validators.requiredTrue),
    });
  }

  public enviarDatos(datosFormulario): void {
    console.log(this.formularioRegistro.value);

    if (this.formularioRegistro.valid && this.imagenAvatar !== undefined) {

      this.esNecesarioRellenarTodosLosCampos = false;
      const usuario: Usuario = datosFormulario;
      usuario.amigos = [];

      this.usuariosService.crearUsuario(usuario).subscribe(
        response => {
        console.log('Respuesta: ' + response.status);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('No se ha podido llevar a cabo el registro ', error);
      }
      );
    } else {
      this.esNecesarioRellenarTodosLosCampos = true;
      console.log(this.formularioRegistro);
    }

  }

  public cargarAvatar(event: Event): void {
    console.log(event);
    const inputValue: any = event.target;
    const fichero: File = inputValue.files[0];
    const fileReader: FileReader = new FileReader();

    fileReader.onerror = (evento) => {
      this.progreso = 0;
      this.mostrarSpinner = false;
    };

    fileReader.onabort = () => {
      this.progreso = 0;
      this.mostrarSpinner = false;
    };

    fileReader.onloadend = (evento) => {
      this.imagenAvatar = fileReader.result;
      this.progreso = 100;
      this.mostrarSpinner = false;
      if (this.formularioRegistro.contains('avatar')) {
        this.formularioRegistro.removeControl('avatar');
      }
      this.formularioRegistro.addControl('avatar', new FormControl(this.imagenAvatar, Validators.required));
    };

    fileReader.onprogress = (progressEvent) => {
      this.progreso = progressEvent.loaded / progressEvent.total * 100;
    };

    this.progreso = 0;
    fileReader.readAsDataURL(fichero);
    this.mostrarSpinner = true;
  }

}

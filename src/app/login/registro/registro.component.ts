import { Component, OnInit } from '@angular/core';

// Formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Servicios
import { ProvinciasService } from '../../servicios/provincias.service';
import { CategoriasService } from '../../servicios/categorias.service';
import { UsuariosService } from '../../servicios/usuarios.service';

// Modelos
import { Provincia } from '../../modelos/provincia.model';
import { Categoria } from '../../modelos/categoria.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public formularioRegistro: FormGroup;

  public listaProvincias: Array<Provincia> = [];
  public listaIntereses: Array<Categoria> = [];

  public imagenAvatar: string | ArrayBuffer;
  public progreso: number;
  public mostrarSpinner: boolean;

  constructor(private provinciasService: ProvinciasService,
              private categoriasService: CategoriasService,
              private usuariosService: UsuariosService) {}

  ngOnInit() {

    this.provinciasService.obtenerProvincias()
      .subscribe(response => {
        console.log('Respuesta de la petición de lista de provincias: ' + response.status);
        this.listaProvincias = response.body;
        console.log('Provincias:', this.listaProvincias);
      });

    this.categoriasService.obtenerListaCategorias$()
      .subscribe( response => {
         this.listaIntereses = response;
    });

    this.formularioRegistro = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      'fechaNacimiento': new FormControl('', Validators.required),
      'sexo': new FormControl('', Validators.required),
      'provincia': new FormControl(),
      'info': new FormControl('', Validators.minLength(20) ),
      'intereses': new FormControl(),
      'terminos': new FormControl('', Validators.requiredTrue),
    });
  }

  public enviarDatos(datos): void {
    console.log(this.formularioRegistro.value);

    this.usuariosService.crearUsuario(datos).subscribe( response => {
      console.log('Respuesta: ' + response.status);
    });
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

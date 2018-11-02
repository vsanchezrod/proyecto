import { Component, OnInit, OnDestroy } from '@angular/core';

// Modelos
import { Usuario } from '../../modelos/usuario.model';
import { Provincia } from '../../modelos/provincia.model';

// Formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Servicios
import { ProvinciasService } from '../../servicios/provincias.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';
import { UsuariosService } from '../../servicios/usuarios.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {

  public usuario: Usuario;
  public listaProvincias: Array<Provincia> = [];
  public usuarioLogado: boolean;
  public formularioActualizacion: FormGroup;

  public imagenAvatar: string | ArrayBuffer;
  public progreso: number;
  public mostrarSpinner: boolean;

  private subscriptionAccessToken: Subscription;
  private subscriptionUsuarioLogado: Subscription;
  private subscriptionProvincias: Subscription;

  private accessToken: string;

  constructor(private provinciasService: ProvinciasService,
              private usuarioSesionService: UsuarioSesionService,
              private usuarioService: UsuariosService) {}

  ngOnInit() {

    this.subscriptionAccessToken = this.usuarioSesionService.obtenerAccessToken$().subscribe ( accessToken => {
      this.accessToken = accessToken;
      // Si no es null, undefined o vacío
      this.usuarioLogado = accessToken ? true : false;
    });

    this.subscriptionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe ( usuario => {
      this.usuario = usuario;
      this.formularioActualizacion = new FormGroup({
        'nombre': new FormControl(this.usuario.nombre),
        'apellido': new FormControl(this.usuario.apellido),
        'password': new FormControl(this.usuario.password, [Validators.minLength(8), Validators.maxLength(20)]),
        // 'password2': new FormControl(this.usuario.password, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
        'fechaNacimiento': new FormControl(this.usuario.fechaNacimiento),
        'sexo': new FormControl(this.usuario.sexo),
        'provincia': new FormControl(this.usuario.provincia),
        'info': new FormControl(this.usuario.info),
      });
    });

    this.subscriptionProvincias = this.provinciasService.obtenerProvincias().subscribe(response => {
      this.listaProvincias = response.body;
    });

  }

  ngOnDestroy() {
    this.subscriptionAccessToken.unsubscribe();
    this.subscriptionUsuarioLogado.unsubscribe();
    this.subscriptionProvincias.unsubscribe();
  }

  public cargarImagen(event: Event): void {
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
      this.usuario.avatar = this.imagenAvatar;
      this.progreso = 100;
      this.mostrarSpinner = false;
      this.formularioActualizacion.addControl('avatar', new FormControl(this.imagenAvatar));
    };

    fileReader.onprogress = (progressEvent) => {
      this.progreso = progressEvent.loaded / progressEvent.total * 100;
    };

    this.progreso = 0;
    fileReader.readAsDataURL(fichero);
    this.mostrarSpinner = true;
  }

  public actualizarUsuario(datos) {
    const usuarioActualizado: Usuario = this.formularioActualizacion.value;
    usuarioActualizado.id = this.usuario.id;

    console.log('Actualizar usuario: ', this.formularioActualizacion.value);
    this.usuarioService.actualizarUsuario(usuarioActualizado, this.accessToken);
  }

}

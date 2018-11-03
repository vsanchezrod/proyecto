import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';

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
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {

  public usuario: Usuario;
  public fechaNacimientoParseada: string;
  public listaProvincias: Array<Provincia> = [];
  public formularioActualizacion: FormGroup;
  public rangoAnios: string;

  public imagenAvatar: string | ArrayBuffer;
  public progreso: number;
  public mostrarSpinner: boolean;

  private subscriptionAccessToken: Subscription;
  private subscriptionUsuarioLogado: Subscription;
  private subscriptionProvincias: Subscription;

  private anioDesde = 1920;
  private edadMinima = 16;

  constructor(private provinciasService: ProvinciasService,
              private usuarioSesionService: UsuarioSesionService,
              private usuarioService: UsuariosService) {}

  ngOnInit() {

    const anioHasta: string = moment().subtract(this.edadMinima, 'years').format('YYYY');
    console.log(anioHasta);
    this.rangoAnios = `${this.anioDesde}:${anioHasta}`;

    this.subscriptionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe ( usuario => {
      this.usuario = usuario;
      this.imagenAvatar = this.usuario.avatar;
      this.fechaNacimientoParseada = moment(this.usuario.fechaNacimiento).locale('es').format('L');
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
      console.log('Entrando en el onloadend');
      this.imagenAvatar = fileReader.result;
      this.progreso = 100;
      this.mostrarSpinner = false;
      if (this.formularioActualizacion.contains('avatar')) {
        this.formularioActualizacion.removeControl('avatar');
      }
      this.formularioActualizacion.addControl('avatar', new FormControl(this.imagenAvatar));
    };

    fileReader.onprogress = (progressEvent) => {
      this.progreso = progressEvent.loaded / progressEvent.total * 100;
    };

    this.progreso = 0;
    fileReader.readAsDataURL(fichero);
    this.mostrarSpinner = true;
  }

  public actualizarUsuario() {
    const usuarioActualizado: Usuario = this.formularioActualizacion.value;
    usuarioActualizado.id = this.usuario.id;
    this.usuarioService.actualizarUsuario(usuarioActualizado).subscribe(
      (response: HttpResponse<Usuario>) => {
        console.log('Actualizar Usuario: ', response);
    });
  }

}

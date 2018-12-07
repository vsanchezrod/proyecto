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
  public es: any;

  public imagenAvatar: string | ArrayBuffer;
  public progreso: number;
  public mostrarSpinner: boolean;

  private subscriptionUsuarioLogado: Subscription;
  private subscriptionProvincias: Subscription;

  private anioDesde = 1920;
  private edadMinima = 16;

  constructor(private provinciasService: ProvinciasService,
              private usuarioSesionService: UsuarioSesionService,
              private usuarioService: UsuariosService) {}

  ngOnInit() {

    const anioHasta: string = moment().subtract(this.edadMinima, 'years').format('YYYY');
    this.rangoAnios = `${this.anioDesde}:${anioHasta}`;

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      monthNames: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      today: 'Hoy',
      clear: 'Borrar'
    };

    this.subscriptionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe(
      usuario => {
        this.usuario = usuario;
        this.imagenAvatar = this.usuario.avatar;
        this.fechaNacimientoParseada = moment(this.usuario.fechaNacimiento).locale('es').format('L');

        this.formularioActualizacion = new FormGroup({
          'nombre': new FormControl(this.usuario.nombre, Validators.required),
          'apellido': new FormControl(this.usuario.apellido, Validators.required),
          'password': new FormControl(this.usuario.password, [Validators.minLength(8), Validators.maxLength(12)]),
          'fechaNacimiento': new FormControl(new Date(this.usuario.fechaNacimiento), Validators.required),
          'sexo': new FormControl(this.usuario.sexo, Validators.required),
          'provincia': new FormControl(this.usuario.provincia, Validators.required),
          'info': new FormControl(this.usuario.info, Validators.required),
      });
    });

    this.subscriptionProvincias = this.provinciasService.obtenerProvincias().subscribe(response => {
      this.listaProvincias = response.body;
    });

  }

  ngOnDestroy() {
    this.subscriptionUsuarioLogado.unsubscribe();
    this.subscriptionProvincias.unsubscribe();
  }

  public cargarImagen(event: Event): void {
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
    const usuarioActualizado: Usuario = new Usuario(this.usuario);
    Object.assign(this.usuario, this.formularioActualizacion.value);
    usuarioActualizado.avatar = this.imagenAvatar;

    this.usuarioService.actualizarUsuario(usuarioActualizado).subscribe(
      (response: HttpResponse<Usuario>) => {
        console.log('Actualizar Usuario: ', response);
        this.usuarioSesionService.modificarUsuarioLogado$(usuarioActualizado);
    });
  }

}

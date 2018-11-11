import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import * as moment from 'moment';

// Modelo de datos
import { Actividad } from '../../../modelos/actividad.model';
import { Categoria } from '../../../modelos/categoria.model';
import { Usuario } from '../../../modelos/usuario.model';

// Servicio
import { CategoriasService } from '../../../servicios/categorias.service';
import { ActividadesService } from '../../../servicios/actividades.service';
import { UsuarioSesionService } from '../../../servicios/usuario-sesion.service';

// Rutas
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-actividad-nueva',
  templateUrl: './actividad-nueva.component.html',
  styleUrls: ['./actividad-nueva.component.css']
})
export class ActividadNuevaComponent implements OnInit, OnDestroy {

  public actividad: Actividad;
  public distanciaMinima: number;
  public distanciaMaxima: number;
  public listaCategorias: Array<Categoria> = [];
  public fechaInicioParseada: string;
  @Output() eventoNuevaSalida = new EventEmitter();

  public imagen: string | ArrayBuffer;
  public progreso: number;
  public mostrarSpinner: boolean;

  public es: any;

  public usuario: Usuario;
  private subscriptionUsuarioLogado: Subscription;

  constructor(private categoriaService: CategoriasService,
              private actividadesService: ActividadesService,
              private usuarioSesionService: UsuarioSesionService,
              private router: Router) {
  }

  ngOnInit() {

    this.actividad = new Actividad();

    this.distanciaMinima = 0;
    this.distanciaMaxima = 150;

    this.categoriaService.obtenerListaCategorias$().subscribe(categorias => {
       this.listaCategorias = categorias;
    });

    this.subscriptionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe(usuario => {
      this.usuario = usuario;
    });

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
  }

  ngOnDestroy() {
    this.subscriptionUsuarioLogado.unsubscribe();
  }

  public cambiarFechaParseada(fechaInicio: Date): void {
    this.fechaInicioParseada = moment(fechaInicio).locale('es').format('DD/MM/YYYY HH:mm');

    console.log('mandando evento: ', 'nueva-salida');
    this.eventoNuevaSalida.emit('nueva-salida');

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
      this.imagen = fileReader.result;
      this.actividad.imagen = this.imagen;
      this.progreso = 100;
      this.mostrarSpinner = false;
    };

    fileReader.onprogress = (progressEvent) => {
      this.progreso = progressEvent.loaded / progressEvent.total * 100;
    };

    this.progreso = 0;
    fileReader.readAsDataURL(fichero);
    this.mostrarSpinner = true;
  }

  public crearActividad(datosFormularioActividad): void {
    this.actividad = datosFormularioActividad;
    this.actividad.imagen = this.imagen;
    this.actividad.idUsuarioCreacion = this.usuario.id;
    this.actividad.listaParticipantes = [];

    this.actividadesService.crearActividad(this.actividad).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Respuesta: ' + response.status);
        this.eventoNuevaSalida.emit('nueva-salida');
      }
    );

    this.redirigirAActividadesPropuestas();

  }

  private redirigirAActividadesPropuestas(): void {
    this.router.navigate(['/usuario/actividades']);
  }
}

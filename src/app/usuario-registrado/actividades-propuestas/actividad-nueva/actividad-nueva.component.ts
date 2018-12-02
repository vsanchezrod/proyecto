import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
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

  public esNuevaActividad: boolean;
  public esFechaIncorrecta: boolean;
  public titulo: string;
  public imagen: string | ArrayBuffer;
  public progreso: number;
  public mostrarSpinner: boolean;
  public rellenarImagen: boolean;

  public es: any;

  public usuario: Usuario;
  private subscriptionUsuarioLogado: Subscription;

  constructor(private categoriaService: CategoriasService,
              private actividadesService: ActividadesService,
              private usuarioSesionService: UsuarioSesionService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    this.actividad = new Actividad();
    this.distanciaMinima = 0;
    this.distanciaMaxima = 150;

    this.activatedRoute.url.subscribe(
      (url) => {
        console.log('URL: ', url);
        if (url[0]['path'] === 'nueva') {
          this.titulo = 'Nueva Actividad';
          this.esNuevaActividad = true;
        }

        if (url[0]['path'] === 'editar') {
          this.activatedRoute.params.subscribe(
            (param) => {
              console.log('Param EDitar: ', param);
              const idActividad = param.id;
              this.actividadesService.obtenerActividadPorId$(idActividad).subscribe(
                (actividadAEditar: Actividad) => {
                  this.titulo = `Editar Actividad: ${actividadAEditar.nombre}`;
                  this.actividad = actividadAEditar;
                  this.esNuevaActividad = false;

                  this.actividad.categorias.forEach(categoria => {
                    categoria['label'] = categoria.id;
                  });

                  console.log('ACTIV CATEGORIA: ', this.actividad.categorias[0]);
                }
              );
            }
          );
        }
    });

    this.categoriaService.obtenerListaCategorias$().subscribe(categorias => {
      this.listaCategorias = [];

      categorias.forEach(categoria => {
        categoria['label'] = categoria.id;
        this.listaCategorias.push(categoria);
      });

      console.log('CAT:', this.listaCategorias[0]);
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
    const fecha: Date = new Date();

    if (this.imagen !== undefined && fecha < this.actividad.fechaInicio) {
      this.rellenarImagen = false;
      this.esFechaIncorrecta = false;
      this.actividad = datosFormularioActividad;
      this.actividad.imagen = this.imagen;
      this.actividad.idUsuarioCreacion = this.usuario.id;
      this.actividad.listaParticipantes = [];

      this.actividadesService.crearActividad(this.actividad).subscribe(
        (response: HttpResponse<any>) => {
          console.log('Respuesta: ', response.status);
          this.redirigirAActividadesPropuestas();
        },
        (error) => {
          console.error('Error: ', error);
        }
      );
    } if (fecha > this.actividad.fechaInicio) {
      this.esFechaIncorrecta = true;
    } else {
      this.rellenarImagen = true;
    }
  }

  public actualizarActividad(datosFormularioActividad): void {
    const actividadEditada: Actividad = datosFormularioActividad;
    const fecha: Date = new Date();

    if (this.imagen !== undefined) {
      actividadEditada.imagen = this.imagen;
    } else {
      actividadEditada.imagen = this.actividad.imagen;
    }

    actividadEditada.idUsuarioCreacion = this.usuario.id;
    actividadEditada.id = this.actividad.id;

    if (fecha < this.actividad.fechaInicio) {
      this.actividadesService.actualizarActividad(actividadEditada).subscribe(
        (response) => {
          this.esFechaIncorrecta = false;
          console.log('Actividad Editada: ', actividadEditada);
          console.log(response);
          this.redirigirAActividadesPropuestas();
        },
        (error) => {
          console.error('Actividad no pudo ser editada: ', error);
        }
      );
    } else {
      this.esFechaIncorrecta = true;
    }

  }

  private redirigirAActividadesPropuestas(): void {
    this.router.navigate(['/usuario/actividades']);
  }

}

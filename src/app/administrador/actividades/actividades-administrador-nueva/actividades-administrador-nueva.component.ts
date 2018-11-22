import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';

// Servicio
import { ViajesService } from '../../../servicios/viajes.service';
import { CategoriasService } from '../../../servicios/categorias.service';
import { UsuarioSesionService } from '../../../servicios/usuario-sesion.service';

// Modelos de datos
import { Viaje } from '../../../modelos/viaje.model';
import { Categoria } from '../../../modelos/categoria.model';
import { Usuario } from '../../../modelos/usuario.model';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actividades-administrador-nueva',
  templateUrl: './actividades-administrador-nueva.component.html',
  styleUrls: ['./actividades-administrador-nueva.component.css']
})
export class ActividadesAdministradorNuevaComponent implements OnInit, OnDestroy {

  public listaCategorias: Array<Categoria> = [];

  public mostrarFormularioViaje: boolean;
  public viaje: Viaje;
  public distanciaMinima: number;
  public distanciaMaxima: number;
  public precioMinimo: number;
  public precioMaximo: number;
  public plazasMinimas: number;
  public plazasMaximas: number;

  public fechaInicioParseada: string;
  public fechaFinParseada: string;
  public esNuevoViaje: boolean;
  public titulo: string;

  public imagen: string | ArrayBuffer;
  public progreso: number;
  public mostrarSpinner: boolean;

  public es: any;
  public usuario: Usuario;
  private subscriptionUsuarioLogado: Subscription;

  constructor(private viajesService: ViajesService,
              private categoriasService: CategoriasService,
              private usuarioSesionService: UsuarioSesionService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.viaje = new Viaje();
    this.distanciaMinima = 0;
    this.distanciaMaxima = 150;
    this.precioMinimo = 0;
    this.precioMaximo = 3000;
    this.plazasMinimas = 1;
    this.plazasMaximas = 30;

    this.subscriptionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe ( usuario => {
      this.usuario = usuario;
    });

    this.activatedRoute.url.subscribe(
      (url) => {
        console.log('URL: ', url);
        if (url[0]['path'] === 'nueva') {
          this.titulo = 'Nuevo Viaje';
          this.esNuevoViaje = true;
        }

        if (url[0]['path'] === 'editar') {
          this.activatedRoute.params.subscribe(
            (param) => {
              console.log('Param EDitar: ', param);
              const idViaje = param.id;
              this.viajesService.obtenerViajePorId$(idViaje).subscribe(
                (viajeAEditar: Viaje) => {
                  this.titulo = `Editar Viaje: ${viajeAEditar.nombre}`;
                  this.viaje = viajeAEditar;
                  this.esNuevoViaje = false;

                  /// PENDIENTE
                  this.viaje.categorias.forEach(categoria => {
                    categoria['label'] = categoria.id;
                  });
                }
              );
            }
          );
        }
    });

    this.categoriasService.obtenerListaCategorias$().subscribe(categorias => {
      this.listaCategorias = [];
      /// PENDIENTEE
      categorias.forEach(categoria => {
        categoria['label'] = categoria.id;
        this.listaCategorias.push(categoria);
      });
    });

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      monthNames: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      today: 'Hoy',
      clear: 'Borrar'
    };
  }

  ngOnDestroy() {
    this.subscriptionUsuarioLogado.unsubscribe();
  }

  public cambiarFechaParseadaInicio(fechaInicio: Date): void {
    this.fechaInicioParseada = moment(fechaInicio).locale('es').format('DD/MM/YYYY HH:mm');
  }

  public cambiarFechaParseadaFin(fechaFin: Date): void {
    this.fechaFinParseada = moment(fechaFin).locale('es').format('DD/MM/YYYY HH:mm');
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
      this.viaje.imagen = this.imagen;
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

  public crearViaje(datos) {
    this.viaje = datos;
    this.viaje.imagen = this.imagen;
    this.viaje.idUsuarioCreacion = this.usuario.id;
    this.viaje.listaParticipantes = [];
    this.viajesService.crearViaje(this.viaje).subscribe(response => {
      console.log('Respuesta: ' + response.status);
      this.redirigirAActividadesAdministrador();
    });
  }

  public actualizarViaje(datosFormularioViaje): void {
    const viajeEditado: Viaje = datosFormularioViaje;
    viajeEditado.imagen = this.imagen;
    viajeEditado.idUsuarioCreacion = this.usuario.id;
    viajeEditado.id = this.viaje.id;

    console.log('VIAJE EDITADO: ', viajeEditado);

    this.viajesService.actualizarViaje(viajeEditado).subscribe(
      (response) => {
        console.log('Viaje Editado: ', viajeEditado);
        console.log(response);
        this.redirigirAActividadesAdministrador();
      },
      (error) => {
        console.error('Actividad no pudo ser editada: ', error);
      }
    );

  }

  private redirigirAActividadesAdministrador(): void {
    this.router.navigate(['/admin/actividades']);
  }
}


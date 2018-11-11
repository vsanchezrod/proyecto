import { Component, OnInit, OnDestroy } from '@angular/core';

// Componentes
import { Actividad } from '../../modelos/actividad.model';

// Modelos
import { Usuario } from '../../modelos/usuario.model';

// Servicios
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';
import { ActividadesService } from '../../servicios/actividades.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actividades-propuestas',
  templateUrl: './actividades-propuestas.component.html',
  styleUrls: ['./actividades-propuestas.component.css']
})
export class ActividadesPropuestasComponent implements OnInit, OnDestroy {

  public salidaSeleccionada: Actividad = new Actividad();
  public usuario: Usuario = new Usuario();
  public listaMisActividadesPropuestas: Array<Actividad>;
  public motivoCancelacion = '';

  private subscriptionUsuarioLogado: Subscription;
  private subscriptionActividadesUsuario: Subscription;

  constructor(private usuarioSesionService: UsuarioSesionService,
              private actividadesService: ActividadesService) { }

  ngOnInit() {

    console.log('OnInit');
    // this.usuario = new Usuario();
    this.listaMisActividadesPropuestas = [];

    // Obtener el usuario logado
    this.subscriptionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;

        // Obtener la lista de actividades creadas por el usuario
        this.actualizarMisSalidas();
    });
  }

  ngOnDestroy() {
    this.subscriptionUsuarioLogado.unsubscribe();
    this.subscriptionActividadesUsuario.unsubscribe();
  }

  public cargarActividad(actividad: Actividad): void {
    this.salidaSeleccionada = actividad;
  }

  public actualizarMisSalidas(event?): void {
    console.log('ACTUALIZAR MIS PROPUESTAS: ', event);
    this.subscriptionActividadesUsuario = this.actividadesService.obtenerActividadesCreadasPorUsuario(this.usuario.id).subscribe(
      (listaActividades: Array<Actividad>) => {
        this.listaMisActividadesPropuestas = [];
        this.listaMisActividadesPropuestas = listaActividades;
        console.log('ActivProp: buscarActivUsuario: listaActividades: ', this.listaMisActividadesPropuestas);

        // Para que cargue por defecto la primera salida
        if (this.listaMisActividadesPropuestas.length > 0) {
          console.log('Mis 1 actividades propuestas:', this.listaMisActividadesPropuestas[0]);
          this.salidaSeleccionada = this.listaMisActividadesPropuestas[0];
        }
    });
  }
}

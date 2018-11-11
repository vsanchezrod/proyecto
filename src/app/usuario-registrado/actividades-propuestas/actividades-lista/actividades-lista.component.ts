import { Component, OnInit, OnDestroy } from '@angular/core';

// Componentes
import { Actividad } from '../../../modelos/actividad.model';

// Modelos
import { Usuario } from '../../../modelos/usuario.model';

// Servicios
import { UsuarioSesionService } from '../../../servicios/usuario-sesion.service';
import { ActividadesService } from '../../../servicios/actividades.service';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actividades-lista',
  templateUrl: './actividades-lista.component.html',
  styleUrls: ['./actividades-lista.component.css']
})
export class ActividadesListaComponent implements OnInit, OnDestroy {

  public salidaSeleccionada: Actividad = new Actividad();
  public usuario: Usuario = new Usuario();
  public listaMisActividadesPropuestas: Array<Actividad>;
  public motivoCancelacion = '';

  private subscriptionUsuarioLogado: Subscription;
  private subscriptionActividadesUsuario: Subscription;

  constructor(private usuarioSesionService: UsuarioSesionService,
              private actividadesService: ActividadesService,
              private router: Router) { }

  ngOnInit() {

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

  public actualizarMisSalidas(): void {
    this.subscriptionActividadesUsuario = this.actividadesService.obtenerActividadesCreadasPorUsuario(this.usuario.id).subscribe(
      (listaActividades: Array<Actividad>) => {
        this.listaMisActividadesPropuestas = [];
        this.listaMisActividadesPropuestas = listaActividades;

        // Para que cargue por defecto la primera salida
        if (this.listaMisActividadesPropuestas.length > 0) {
          this.salidaSeleccionada = this.listaMisActividadesPropuestas[0];
        }
    });
  }

  public redirigirEditarAct() {
    console.log('QUIERO REDIRIGIR');
    this.router.navigate(['usuario/actividades/editar/' + this.salidaSeleccionada.id]);
  }
}

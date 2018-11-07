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

  public salida: Actividad = new Actividad();
  public usuario: Usuario;
  public listaMisActividadesPropuestas: Array<Actividad>;

  private subscriptionUsuarioLogado: Subscription;
  private subscriptionActividadesUsuario: Subscription;

  constructor(private usuarioSesionService: UsuarioSesionService,
              private actividadesService: ActividadesService) { }

  ngOnInit() {

    // this.usuario = new Usuario();
    this.listaMisActividadesPropuestas = [];

    // Obtener el usuario logado
    this.subscriptionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;

        // Obtener la lista de actividades creadas por el usuario
        this.subscriptionActividadesUsuario = this.actividadesService.buscarActividadesCreadasPorUsuario(this.usuario.id).subscribe(
          (listaActividades: Array<Actividad>) => {
            this.listaMisActividadesPropuestas = listaActividades;
            console.log('ActivProp: buscarActivUsuario: listaActividades: ', this.listaMisActividadesPropuestas);
        });
        // Para que cargue por defecto la primera salida
        if (this.listaMisActividadesPropuestas.length > 0) {
          console.log('Mis 1 actividades propuestas:', this.listaMisActividadesPropuestas[0]);
          this.salida = this.listaMisActividadesPropuestas[0];
        }
    });

  }

  ngOnDestroy() {
    this.subscriptionUsuarioLogado.unsubscribe();
    this.subscriptionActividadesUsuario.unsubscribe();
  }

  public cancelarSalida(actividad): void {
    alert('SALIDA CANCELADA');
  }

  public cargarActividad(actividad): void {
    console.log('ACTIVIDAD PARA CARGAR: ' , actividad);
    this.salida = actividad;
  }

}

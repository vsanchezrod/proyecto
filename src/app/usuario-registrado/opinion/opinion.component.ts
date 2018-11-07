import { Component, OnInit, OnDestroy } from '@angular/core';

// Formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Modelos
import { Opinion } from '../../modelos/opinion.model';
import { Usuario } from '../../modelos/usuario.model';
import { Viaje } from '../../modelos/viaje.model';
import { Actividad } from '../../modelos/actividad.model';

// Servicios
import { OpinionesService } from '../../servicios/opiniones.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';
import { ViajesService } from '../../servicios/viajes.service';
import { ActividadesService } from '../../servicios/actividades.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit, OnDestroy {

  public formularioOpinion: FormGroup;
  public usuario: Usuario;
  public listaActividadesDelUsuario: Array<any> = [];

  private opinion: Opinion;
  private subscripcionUsuarioLogado: Subscription;
  private subscripcionListaViajes: Subscription;
  private subscripcionListaActividades: Subscription;

  constructor(private opinionesService: OpinionesService,
              private usuarioSesionService: UsuarioSesionService,
              private viajesService: ViajesService,
              private actividadesService: ActividadesService) { }

  ngOnInit() {

    // this.usuario = new Usuario();

    this.formularioOpinion = new FormGroup({
      'actividad': new FormControl('', Validators.required),
      'titulo': new FormControl('', Validators.required),
      'detalle': new FormControl('', [Validators.required, Validators.minLength(15)]),
      'organizacionValoracion': new FormControl('', Validators.required),
      'ambienteValoracion': new FormControl('', Validators.required),
      'recorridoValoracion': new FormControl('', Validators.required),
    });

    this.subscripcionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe ( (usuario: Usuario) => {
      this.usuario = usuario;

      this.subscripcionListaViajes = this.subscripcionListaViajes = this.viajesService.obtenerListadoViajesRealizadosPorUsuario$(this.usuario.id).subscribe(
        (listaViajes: Array<Viaje>) => {
            for (const viaje of listaViajes) {
              this.listaActividadesDelUsuario.push(viaje);
            }
            console.log('Lista de viajes del usuario: ', listaViajes);
        }
      );

      this.subscripcionListaActividades = this.actividadesService.obtenerListadoActividadesRealizadasPorUsuario$(this.usuario.id).subscribe(
        (listaActividades: Array<Actividad>) => {
            for (const actividad of listaActividades) {
              this.listaActividadesDelUsuario.push(actividad);
            }
            console.log('Lista de actividades del usuario: ', listaActividades);
        }
      );

      console.log('Lista de actividades del usuario: ', this.listaActividadesDelUsuario);

    });
  }

  ngOnDestroy() {
    this.subscripcionUsuarioLogado.unsubscribe();
    this.subscripcionListaViajes.unsubscribe();
    this.subscripcionListaActividades.unsubscribe();
  }

  public enviarOpinion(): void {

    this.opinion = this.formularioOpinion.value;
    this.opinion.fecha = new Date();
    this.opinion.usuarioOpinion = this.usuario.id;

    console.log('Opinion: ', this.opinion);

    this.opinionesService.guardarOpinion(this.opinion).subscribe(response => {
        console.log('OpiniónComp: RespuestaGuardarOpinion ' + response.status);
      });

    // MOSTRAR MENSAJE DE QUE SE HA ENVIADO!!

  }

}

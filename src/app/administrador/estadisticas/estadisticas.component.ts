import { Component, OnInit } from '@angular/core';

// Servicios
import { ViajesService } from '../../servicios/viajes.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';
import { ActividadesService } from '../../servicios/actividades.service';
import { OpinionesService } from '../../servicios/opiniones.service';
import { UsuariosService } from '../../servicios/usuarios.service';



@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  public contadorViajes: number;
  public contadorActividades: number;
  public contadorUsuarios: number;
  public contadorOpiniones: number;
  private accessToken: string;

  constructor(private viajesService: ViajesService,
              private usuarioSesionService: UsuarioSesionService,
              private actividadesService: ActividadesService,
              private usuariosService: UsuariosService,
              private opinionesService: OpinionesService) { }

  ngOnInit() {

    this.usuarioSesionService.obtenerAccessToken$().subscribe ( accessToken => {
      console.log('ActividadesComponent: obtenerAccessToken: accessToken', accessToken);
      this.accessToken = accessToken;
    });

    this.viajesService.obtenerNumeroViajes(this.accessToken).subscribe( (numeroViajes: number) => {
      this.contadorViajes = numeroViajes;
      console.log('EstadisticasComp: ObtenerNumViajes: numViajes: ', this.contadorViajes);
    });

    this.actividadesService.obtenerNumeroActividades(this.accessToken).subscribe( (numeroActividades: number) => {
      this.contadorActividades = numeroActividades;
      console.log('EstadisticasComp: ObtenerNumActividades: numActividades: ', this.contadorActividades);
    });

    this.usuariosService.obtenerNumeroUsuarios(this.accessToken).subscribe( (numeroUsuarios: number) => {
      this.contadorUsuarios = numeroUsuarios;
      console.log('EstadisticasComp: ObtenerNumActividades: numActividades: ', this.contadorUsuarios);
    });

    this.opinionesService.obtenerNumeroOpiniones(this.accessToken).subscribe( (numeroOpiniones: number) => {
      this.contadorOpiniones = numeroOpiniones;
      console.log('EstadisticasComp: ObtenerNumActividades: numActividades: ', this.contadorOpiniones);
    });

  }

}

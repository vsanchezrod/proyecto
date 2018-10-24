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
      this.accessToken = accessToken;
    });

    this.viajesService.obtenerNumeroViajes(this.accessToken).subscribe( (numeroViajes: number) => {
      this.contadorViajes = numeroViajes;
    });

    this.actividadesService.obtenerNumeroActividades(this.accessToken).subscribe( (numeroActividades: number) => {
      this.contadorActividades = numeroActividades;
    });

    this.usuariosService.obtenerNumeroUsuarios(this.accessToken).subscribe( (numeroUsuarios: number) => {
      this.contadorUsuarios = numeroUsuarios;
    });

    this.opinionesService.obtenerNumeroOpiniones(this.accessToken).subscribe( (numeroOpiniones: number) => {
      this.contadorOpiniones = numeroOpiniones;
    });

  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';

// Modelo
import { Total } from '../../modelos/total.model';

// Servicios
import { ViajesService } from '../../servicios/viajes.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';
import { ActividadesService } from '../../servicios/actividades.service';
import { OpinionesService } from '../../servicios/opiniones.service';
import { UsuariosService } from '../../servicios/usuarios.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit, OnDestroy {

  public contadorViajes: number;
  public contadorActividades: number;
  public contadorUsuarios: number;
  public contadorOpiniones: number;
  private accessToken: string;
  private subscriptionAccessToken: Subscription;

  constructor(private viajesService: ViajesService,
              private usuarioSesionService: UsuarioSesionService,
              private actividadesService: ActividadesService,
              private usuariosService: UsuariosService,
              private opinionesService: OpinionesService) { }

  ngOnInit() {

    this.subscriptionAccessToken = this.usuarioSesionService.obtenerAccessToken$().subscribe ( accessToken => {
      this.accessToken = accessToken;
    });

    this.viajesService.obtenerNumeroViajes(this.accessToken).subscribe( (totalViajes: Total) => {
      this.contadorViajes = totalViajes.total;
    });

    this.actividadesService.obtenerNumeroActividades(this.accessToken).subscribe( (totalActividades: Total) => {
      this.contadorActividades = totalActividades.total;
    });

    this.usuariosService.obtenerNumeroUsuarios(this.accessToken).subscribe( (totalUsuarios: Total) => {
      this.contadorUsuarios = totalUsuarios.total;
    });

    this.opinionesService.obtenerNumeroOpiniones(this.accessToken).subscribe( (totalOpiniones: Total) => {
      this.contadorOpiniones = totalOpiniones.total;
    });

  }

  ngOnDestroy() {
    this.subscriptionAccessToken.unsubscribe();
  }
}

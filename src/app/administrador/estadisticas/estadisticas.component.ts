import { Component, OnInit } from '@angular/core';

// Modelo
import { Total } from '../../modelos/total.model';

// Servicios
import { ViajesService } from '../../servicios/viajes.service';

import { ActividadesService } from '../../servicios/actividades.service';
import { OpinionesService } from '../../servicios/opiniones.service';
import { UsuariosService } from '../../servicios/usuarios.service';

import { Subscription } from 'rxjs';

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

  constructor(private viajesService: ViajesService,
              private actividadesService: ActividadesService,
              private usuariosService: UsuariosService,
              private opinionesService: OpinionesService) { }

  ngOnInit() {


    this.viajesService.obtenerNumeroViajes().subscribe( (totalViajes: Total) => {
      this.contadorViajes = totalViajes.total;
    });

    this.actividadesService.obtenerNumeroActividades().subscribe( (totalActividades: Total) => {
      this.contadorActividades = totalActividades.total;
    });

    this.usuariosService.obtenerNumeroUsuarios().subscribe( (totalUsuarios: Total) => {
      this.contadorUsuarios = totalUsuarios.total;
    });

    this.opinionesService.obtenerNumeroOpiniones().subscribe( (totalOpiniones: Total) => {
      this.contadorOpiniones = totalOpiniones.total;
    });

  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';

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
export class EstadisticasComponent implements OnInit, OnDestroy {

  public contadorViajes: number;
  public contadorActividades: number;
  public contadorUsuarios: number;
  public contadorOpiniones: number;

  public data: any;

  private subscripcionContadorViajes: Subscription;
  private subscripcionContadorActividades: Subscription;
  private subscripcionContadorUsuarios: Subscription;
  private subscripcionContadorOpiniones: Subscription;

  constructor(private viajesService: ViajesService,
              private actividadesService: ActividadesService,
              private usuariosService: UsuariosService,
              private opinionesService: OpinionesService) { }

  ngOnInit() {

    this.subscripcionContadorViajes = this.viajesService.obtenerNumeroViajes().subscribe( (totalViajes: Total) => {
      this.contadorViajes = totalViajes.total;
    });

    this.subscripcionContadorActividades = this.actividadesService.obtenerNumeroActividades().subscribe( (totalActividades: Total) => {
      this.contadorActividades = totalActividades.total;
    });

    this.subscripcionContadorUsuarios = this.usuariosService.obtenerNumeroUsuarios().subscribe( (totalUsuarios: Total) => {
      this.contadorUsuarios = totalUsuarios.total;
    });

    this.subscripcionContadorOpiniones = this.opinionesService.obtenerNumeroOpiniones().subscribe( (totalOpiniones: Total) => {
      this.contadorOpiniones = totalOpiniones.total;
      this.data = {
        labels: ['Viajes', 'Actividades', 'Usuarios', 'Opiniones'],
        datasets: [
            {
                label: 'Estadísticas',
                backgroundColor: '#9CCC65',
                borderColor: '#7CB342',
                data: [this.contadorViajes, this.contadorActividades, this.contadorUsuarios, this.contadorOpiniones]
            }
        ]
      };
    });
  }

  ngOnDestroy() {
    this.subscripcionContadorActividades.unsubscribe();
    this.subscripcionContadorOpiniones.unsubscribe();
    this.subscripcionContadorUsuarios.unsubscribe();
    this.subscripcionContadorViajes.unsubscribe();
  }
}

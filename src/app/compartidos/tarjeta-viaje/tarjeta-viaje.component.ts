import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';

// Modelos
import {Viaje} from '../../modelos/viaje.model';

// Router para poder navegar por las diferentes rutas
import {Router} from '@angular/router';

@Component({
  selector: 'app-tarjeta-viaje',
  templateUrl: './tarjeta-viaje.component.html',
  styleUrls: ['./tarjeta-viaje.component.css']
})
export class TarjetaViajeComponent implements OnInit {

  // Se recibe el valor de salida desde fuera (elemento padre)
  @Input() viaje: Viaje = new Viaje();
  public fechaInicioParseada: string;
  public fechaFinParseada: string;

  constructor(private router: Router) { }

  ngOnInit() {

    this.viaje.listaParticipantes = [];
    this.fechaInicioParseada = moment(this.viaje.fechaInicio).locale('es').format('DD/MM/YYYY HH:mm');
    this.fechaFinParseada = moment(this.viaje.fechaFin).locale('es').format('DD/MM/YYYY HH:mm');
  }

  // Método para mostrar la salida
  public verViaje(): void {
    this.router.navigate(['/viaje', this.viaje.id]);
  }

  public apuntarse(): void {
    console.log('Quiero apuntarme a la actividad: ');
  }
}


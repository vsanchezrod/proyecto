import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';

// Componentes
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
  @Input() viaje: Viaje;
  public fechaInicioParseada: string;
  public fechaFinParseada: string;

  constructor(private router: Router) { }

  ngOnInit() {

    this.fechaInicioParseada = moment(this.viaje.fechaInicio).locale('es').format('d/MM/YYYY HH:mm');
    this.fechaFinParseada = moment(this.viaje.fechaInicio).locale('es').format('L');
  }

  // Método para mostrar la salida
  verViaje() {
    this.router.navigate(['/viaje', this.viaje.id]);
  }
}

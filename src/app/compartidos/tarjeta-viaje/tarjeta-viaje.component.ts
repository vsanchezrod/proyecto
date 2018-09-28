import {Component, Input, OnInit} from '@angular/core';

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

  constructor(private router: Router) { }

  ngOnInit() {}

  // Método para mostrar la salida
  verViaje() {
    this.router.navigate(['/viaje', this.viaje.id]);
  }
}

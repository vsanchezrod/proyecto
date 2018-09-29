import { Component, OnInit, Input } from '@angular/core';

// Componentes
import { Salida } from '../../modelos/salida.model';

// Router para poder navegar por las diferentes rutas
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta-salida',
  templateUrl: './tarjeta-salida.component.html',
  styleUrls: ['./tarjeta-salida.component.css']
})
export class TarjetaSalidaComponent implements OnInit {

  // Se recibe el valor de salida desde fuera (elemento padre)
  @Input() salida: Salida;

  constructor(private router: Router) { }

  ngOnInit() {}

  // Método para mostrar la salida
  verSalida() {
    this.router.navigate(['/salida', this.salida.id]);
  }

}

import { Component, OnInit } from '@angular/core';

// Componentes
import { Salida } from '../../modelos/salida.model';

@Component({
  selector: 'app-actividades-propuestas',
  templateUrl: './actividades-propuestas.component.html',
  styleUrls: ['./actividades-propuestas.component.css']
})
export class ActividadesPropuestasComponent implements OnInit {

  salida: Salida = new Salida();

  constructor() { }

  ngOnInit() {}

}

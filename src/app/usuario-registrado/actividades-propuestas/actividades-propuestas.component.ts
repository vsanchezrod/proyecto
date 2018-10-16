import { Component, OnInit } from '@angular/core';

// Componentes
import { Actividad } from '../../modelos/actividad.model';

@Component({
  selector: 'app-actividades-propuestas',
  templateUrl: './actividades-propuestas.component.html',
  styleUrls: ['./actividades-propuestas.component.css']
})
export class ActividadesPropuestasComponent implements OnInit {

  salida: Actividad = new Actividad();

  constructor() { }

  ngOnInit() {}

}

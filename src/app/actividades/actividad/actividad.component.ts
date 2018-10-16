import { Component, OnInit } from '@angular/core';

// Componentes
import { Actividad } from '../../modelos/actividad.model';

// Servicios


// Para poder recuperar un parámetro de la url
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {

  salida: Actividad;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    /* Params regresa un observador, que está pendiente de los cambios y para que funcione se necesita suscribirse a ese observador*/
    /*this.activatedRoute.params.subscribe(parametro => {
      console.log(parametro);
      this.salida = this.salidasService.obtenerSalida(parametro['id']);
      console.log(this.salida);
    });*/
  }

}

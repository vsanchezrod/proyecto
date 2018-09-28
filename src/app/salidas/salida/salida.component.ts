import { Component, OnInit } from '@angular/core';

// Componentes
import { Salida } from '../../modelos/salida.model';

// Servicios
import { SalidasService } from '../../servicios/salidas.service';

// Para poder recuperar un parámetro de la url
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent implements OnInit {

  salida: Salida;

  constructor(private salidasService: SalidasService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    /* Params regresa un observador, que está pendiente de los cambios y para que funcione se necesita suscribirse a ese observador*/
    this.activatedRoute.params.subscribe(parametro => {
      console.log(parametro);
      this.salida = this.salidasService.obtenerSalida(parametro['id']);
      console.log(this.salida);
    });
  }

}

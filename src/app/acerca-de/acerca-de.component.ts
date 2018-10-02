import { Component, OnInit } from '@angular/core';

// Servicios
import { OpinionesService } from '../servicios/opiniones.service';

// Componentes
import { Opinion } from '../modelos/opinion.model';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  listaOpiniones: Array<Opinion> = [];

  constructor(private opinionesService: OpinionesService) { }

  ngOnInit() {

    this.opinionesService.obtenerOpiniones()
      .subscribe( response => {
        console.log('Respuesta de la petición: ' + response.status);
        this.listaOpiniones = response.body;
      });
  }

}

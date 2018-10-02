import { Component, OnInit } from '@angular/core';

// Componentes
import { Opinion } from '../../modelos/opinion.model';

// Servicio
import { OpinionesService } from '../../servicios/opiniones.service';


@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.css']
})

export class OpinionesComponent implements OnInit {

  listaOpiniones: Array<Opinion> = [];

  constructor(private opinionesService: OpinionesService) { }

  ngOnInit() {
    this.opinionesService.obtenerOpiniones()
      .subscribe( response => {
        console.log('Respuesta de la petición: ' + response.status);
        this.listaOpiniones = response.body;
      });
  }

  public borrarOpinion(id: string)  {

    this.opinionesService.borrarOpinion(id);
  }

}

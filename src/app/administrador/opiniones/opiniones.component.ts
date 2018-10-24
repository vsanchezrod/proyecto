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

  public listaOpiniones: Array<Opinion> = [];

  constructor(private opinionesService: OpinionesService) { }

  ngOnInit() {

    this.opinionesService.obtenerOpiniones().subscribe( (listaOpiniones: Array<Opinion>) => {
      this.listaOpiniones = listaOpiniones;
    });
  }

  public borrarOpinion(id: string)  {

    this.opinionesService.borrarOpinion(id);
  }

}

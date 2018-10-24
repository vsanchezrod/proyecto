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

  public listaOpiniones: Array<Opinion> = [];

  constructor(private opinionesService: OpinionesService) { }

  ngOnInit() {

    this.opinionesService.obtenerOpiniones().subscribe( (listaOpiniones: Array<Opinion>) => {
        this.listaOpiniones = listaOpiniones;
    });
  }

}

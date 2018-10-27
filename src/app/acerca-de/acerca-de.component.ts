import { Component, OnInit, OnDestroy } from '@angular/core';

// Servicios
import { OpinionesService } from '../servicios/opiniones.service';

// Componentes
import { Opinion } from '../modelos/opinion.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit, OnDestroy {

  public listaOpiniones: Array<Opinion> = [];
  private subscriptionObtenerOpiniones: Subscription;


  constructor(private opinionesService: OpinionesService) { }

  ngOnInit() {

    this.opinionesService.obtenerOpiniones().subscribe(
      (listaOpiniones: Array<Opinion>) => {
        this.listaOpiniones = listaOpiniones;
        console.log('Acercade: ObtenerListaOpin: ', this.listaOpiniones);
    });
  }

  ngOnDestroy(): void {
     this.subscriptionObtenerOpiniones.unsubscribe();
  }

}

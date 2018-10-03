import { Component, OnInit } from '@angular/core';

// Componente
import { Salida } from '../modelos/salida.model';

// Servicio
import { SalidasService } from '../servicios/salidas.service';


@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent implements OnInit {

  listaSalidas: Array<Salida>;

  constructor(private salidasService: SalidasService) { }

  ngOnInit() {

    this.salidasService.obtenerSalidas().subscribe(response => {
      this.listaSalidas = response.body;
    });
  }

}

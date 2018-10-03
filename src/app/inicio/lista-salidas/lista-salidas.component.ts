import { Component, OnInit } from '@angular/core';

// Modelos de datos
import { Salida } from '../../modelos/salida.model';

// Servicios
import { SalidasService } from '../../servicios/salidas.service';

@Component({
  selector: 'app-lista-salidas',
  templateUrl: './lista-salidas.component.html',
  styleUrls: ['./lista-salidas.component.css']
})
export class ListaSalidasComponent implements OnInit {

  listaSalidas: Array<Salida>;

  constructor(private salidasService: SalidasService) { }

  ngOnInit() {

    this.salidasService.obtenerSalidas().subscribe(response => {
      this.listaSalidas = response.body;
    });
  }

}


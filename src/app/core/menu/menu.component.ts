import { Component, OnInit } from '@angular/core';

import { ViajesService } from '../../servicios/viajes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private contador = 0;

  constructor(private viajeService: ViajesService) { }

  ngOnInit() {
  }

  kkkk() {
    this.contador += 1;
    this.viajeService.obtenerViaje('' + this.contador);
  }

}

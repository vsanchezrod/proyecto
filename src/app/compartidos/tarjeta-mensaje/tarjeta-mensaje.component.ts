import { Component, OnInit, Input } from '@angular/core';

// Modelo de datos
import { Mensaje } from '../../modelos/mensaje.model';

@Component({
  selector: 'app-tarjeta-mensaje',
  templateUrl: './tarjeta-mensaje.component.html',
  styleUrls: ['./tarjeta-mensaje.component.css']
})
export class TarjetaMensajeComponent implements OnInit {

  @Input() mensaje: Mensaje;

  constructor() { }

  ngOnInit() {}



}

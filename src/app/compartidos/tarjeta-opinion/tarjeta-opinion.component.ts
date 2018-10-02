import { Component, OnInit, Input } from '@angular/core';
import {Opinion} from '../../modelos/opinion.model';

@Component({
  selector: 'app-tarjeta-opinion',
  templateUrl: './tarjeta-opinion.component.html',
  styleUrls: ['./tarjeta-opinion.component.css']
})
export class TarjetaOpinionComponent implements OnInit {

  // Se recibe el valor del elemento padre
  @Input() opinion: Opinion;

  constructor() { }

  ngOnInit() {
  }

}

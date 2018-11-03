import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public fecha: any;

  constructor() {}

  ngOnInit() {

    this.fecha = moment(new Date()).locale('es').format('LLLL');
 }

}

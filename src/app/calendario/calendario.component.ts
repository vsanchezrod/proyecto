import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  public events: any[];

  constructor() { }

  ngOnInit() {

    this.events = [
      {
        'title': 'Ruta en bici a Marrupe',
        'start': '2018-09-16'
      },
      {
        'title': 'Ruta en bici a Sotillo de las Palomas',
        'start': '2018-09-17'
      },
      {
        'title': 'Ruta en bici a Cervera',
        'start': '2018-09-18'
      }
    ];
  }

}

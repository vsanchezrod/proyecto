import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendarioUsuario.component.html',
  styleUrls: ['./calendarioUsuario.component.css']
})
export class CalendarioUsuarioComponent implements OnInit {

  public events: Array<any>;

  constructor() { }

  ngOnInit() {
    this.events = [];
  }

}

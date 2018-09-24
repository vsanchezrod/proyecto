import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-sesion-menu',
  templateUrl: './info-sesion-menu.component.html',
  styleUrls: ['./info-sesion-menu.component.css']
})
export class InfoSesionMenuComponent implements OnInit {

  usuarioRegistrado: boolean;

  constructor() { }

  ngOnInit() {
    this.usuarioRegistrado = true;
  }

}

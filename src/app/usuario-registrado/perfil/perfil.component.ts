import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {

    this.activatedRoute.parent.params.subscribe( parametros => {

      console.log('Ruta hija. Usuario Nuevo');
      console.log(parametros);
    });


  }

  ngOnInit() {
  }

}

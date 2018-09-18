import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formularioRegistro: FormGroup;

  constructor() { }

  ngOnInit() {

    this.formularioRegistro = new FormGroup( {
      'nombre': new FormControl(),
      'apellido': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl(),
      'fechaNacimiento': new FormControl(),
      'sexo': new FormControl(),
      'provincia': new FormControl(),
      'avatar': new FormControl(),
      'intereses': new FormArray([
          new FormControl() ]),
      'terminos': new FormControl()

    });
  }

  enviarDatos() {
    console.log(this.formularioRegistro.value);
  }
}

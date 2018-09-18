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
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      'fechaNacimiento': new FormControl('', Validators.required),
      'sexo': new FormControl('', Validators.required),
      'provincia': new FormControl(),
      'avatar': new FormControl(),
      'intereses': new FormArray([
          new FormControl() ]),
      'terminos': new FormControl('', Validators.requiredTrue),

    });
  }

  enviarDatos() {
    console.log(this.formularioRegistro.value);
  }
}

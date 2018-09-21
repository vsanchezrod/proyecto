import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

// Servicios
import { ProvinciasService } from '../../servicios/provincias.service';

// Modelos
import { Provincia } from '../../modelos/provincia.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formularioRegistro: FormGroup;

  listaProvincias: Array<Provincia> = [];

  interesesLista = [
    { id: 1, nombre: 'Bici', descripcion: 'Kaka'},
    { id: 2, nombre: 'Senderismo', descripcion: 'Kaka'},
    { id: 3, nombre: 'Padel', descripcion: 'Kaka'},
    { id: 4, nombre: 'Viajes', descripcion: 'Kaka'},
    { id: 5, nombre: 'Salidas de un día', descripcion: 'Kaka'}
    ];


  constructor(private provinciasService: ProvinciasService) {}

  ngOnInit() {

    this.provinciasService.obtenerProvincias()
      .subscribe(response => {
        console.log('Respuesta de la petición: ' + response.status)
        this.listaProvincias = response.body;
      })

    this.formularioRegistro = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      'fechaNacimiento': new FormControl('', Validators.required),
      'sexo': new FormControl('', Validators.required),
      'provincia': new FormControl(),
      'avatar': new FormControl(),
      'intereses': new FormControl(),
      'terminos': new FormControl('', Validators.requiredTrue),
    });
  }



  enviarDatos() {
    console.log(this.formularioRegistro.value);
    console.log(this.formularioRegistro);
  }
}

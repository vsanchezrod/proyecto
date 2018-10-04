import { Component, OnInit } from '@angular/core';

// Formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Servicios
import { ProvinciasService } from '../../servicios/provincias.service';
import { InteresesService } from '../../servicios/intereses.service';

// Modelos
import { Provincia } from '../../modelos/provincia.model';
import { Interes } from '../../modelos/interes.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formularioRegistro: FormGroup;

  listaProvincias: Array<Provincia> = [];

  listaIntereses: Array<Interes> = [];

  constructor(private provinciasService: ProvinciasService,
              private interesesService: InteresesService) {}

  ngOnInit() {

    this.provinciasService.obtenerProvincias()
      .subscribe(response => {
        console.log('Respuesta de la petición de lista de provincias: ' + response.status);
        this.listaProvincias = response.body;
      });

    this.interesesService.obtenerListaIntereses()
      .subscribe(response => {
        console.log('Respuesta de la petición de lista de intereses: ' + response.status);
        this.listaIntereses = response.body;
      });

    this.formularioRegistro = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      'fechaNacimiento': new FormControl('', Validators.required),
      'sexo': new FormControl('', Validators.required),
      'provincia': new FormControl(),
      'avatar': new FormControl(),
      'info': new FormControl('', Validators.minLength(20) ),
      'intereses': new FormControl(),
      'terminos': new FormControl('', Validators.requiredTrue),
    });
  }

  enviarDatos() {
    console.log(this.formularioRegistro.value);
    console.log(this.formularioRegistro);
  }
}

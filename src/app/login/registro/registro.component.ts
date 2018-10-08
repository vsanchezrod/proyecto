import { Component, OnInit } from '@angular/core';

// Formularios
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

  // listaIntereses: Array<Interes> = [];

  imagenAvatar: string;
  progreso: number;
  mostrarSpinner: boolean;

  avatarFormControl: FormControl = new FormControl();

  constructor(private provinciasService: ProvinciasService) {}

  ngOnInit() {

    this.provinciasService.obtenerProvincias()
      .subscribe(response => {
        console.log('Respuesta de la petición de lista de provincias: ' + response.status);
        this.listaProvincias = response.body;
      });

    this.formularioRegistro = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      'fechaNacimiento': new FormControl('', Validators.required),
      'sexo': new FormControl('', Validators.required),
      'provincia': new FormControl(),
      'avatar': this.avatarFormControl,
      'info': new FormControl('', Validators.minLength(20) ),
      'intereses': new FormControl(),
      'terminos': new FormControl('', Validators.requiredTrue),
    });
  }

  public enviarDatos(): void {
    console.log(this.formularioRegistro.value);
    console.log(this.formularioRegistro);
  }

  public cargarAvatar(event: Event): void {
    const inputValue: any = event.target;
    console.log(event);
    console.log(inputValue);

    const fichero: File = inputValue.files[0];
    console.log('file:', fichero);

    const fileReader: FileReader = new FileReader();

    fileReader.onerror = (evento) => {
      console.error('Error leyendo fichero:', evento);
      this.progreso = 0;
      this.mostrarSpinner = false;
    };

    fileReader.onabort = () => {
      this.progreso = 0;
      this.mostrarSpinner = false;
    };

    fileReader.onloadend = (evento) => {
      this.imagenAvatar = fileReader.result;
      console.log('imagen! =====>>>>', this.imagenAvatar);
      this.progreso = 100;
      this.mostrarSpinner = false;
      this.avatarFormControl.setValue(fileReader.result);
    };

    fileReader.onprogress = (progressEvent) => {
      console.log('progressEvent: ', progressEvent);
      this.progreso = progressEvent.loaded / progressEvent.total * 100;
    };

    this.progreso = 0;
    fileReader.readAsDataURL(fichero);
    this.mostrarSpinner = true;
  }


}

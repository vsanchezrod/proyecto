import { Component, OnInit } from '@angular/core';

import { Provincia} from '../modelos/provincia.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  imagen: string;
  progreso: number;
  cargando: boolean;

  constructor() {}

  ngOnInit() {}

  public changeListener(evento: Event): void {
    console.log(evento);
    const inputValue: any = evento.target;
    const fichero: File = inputValue.files[0];
    console.log('file:', fichero);

    const fileReader: FileReader = new FileReader();

    fileReader.onerror = (event) => {
      console.error('Error leyendo fichero:', event);
      this.progreso = 0;
      this.cargando = false;
    };

    fileReader.onabort = () => {
      this.progreso = 0;
      this.cargando = false;
    };

    fileReader.onloadend = (event) => {
      this.imagen = fileReader.result;
      console.log('imagen! =====>>>>', this.imagen);
      this.progreso = 100;
      this.cargando = false;
    };

    fileReader.onprogress = (progressEvent) => {
      console.log('progressEvent: ', progressEvent);
      this.progreso = progressEvent.loaded / progressEvent.total * 100;
    };

    this.progreso = 0;
    fileReader.readAsDataURL(fichero);
    this.cargando = true;
  }

}

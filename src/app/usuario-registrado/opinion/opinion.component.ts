import { Component, OnInit } from '@angular/core';

import { MessageService} from 'primeng/api';

// Formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit {

  formularioOpinion: FormGroup;

  listaActividades: Array<any>;

  constructor(private messageService: MessageService) { }

  ngOnInit() {

    this.formularioOpinion = new FormGroup({
      'actividad': new FormControl('', Validators.required),
      'titulo': new FormControl('', Validators.required),
      'detalle': new FormControl('', [Validators.required, Validators.minLength(20)]),
      'organizacionValoracion': new FormControl('', Validators.required),
      'ambienteValoracion': new FormControl('', Validators.required),
      'recorridoValoracion': new FormControl('', Validators.required),
    });

    this.listaActividades = [
      {nombre: 'Ruta1'},
      {nombre: 'Ruta2'},
      {nombre: 'Ruta3'},
      {nombre: 'Ruta4'}
    ];
  }

  save(severity: string) {
    this.messageService.add({severity: severity, summary: 'Success', detail: 'Data Saved'});
  }

  enviarOpinion() {
    console.log(this.formularioOpinion);
  }

}

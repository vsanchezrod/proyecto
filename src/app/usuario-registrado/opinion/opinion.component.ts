import { Component, OnInit, OnDestroy } from '@angular/core';

// Formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Modelos
import { Opinion } from '../../modelos/opinion.model';
import { Usuario } from '../../modelos/usuario.model';

// Servicios
import { OpinionesService } from '../../servicios/opiniones.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit, OnDestroy {

  public formularioOpinion: FormGroup;
  public usuario: Usuario;
  // PENDIENTE
  public listaActividades: Array<any>;

  private accessToken: string;
  private opinion: Opinion;
  private subscriptionAccessToken: Subscription;
  private subscriptionUsuarioLogado: Subscription;


  constructor(private opinionesService: OpinionesService,
              private usuarioSesionService: UsuarioSesionService) { }

  ngOnInit() {

    this.usuario = new Usuario();

    this.subscriptionAccessToken = this.usuarioSesionService.obtenerAccessToken$().subscribe( (accesToken: string ) => {
      this.accessToken = accesToken;
    });

    this.subscriptionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe ( (usuario: Usuario) => {
      this.usuario = usuario;
    });

    this.formularioOpinion = new FormGroup({
      'actividad': new FormControl('', Validators.required),
      'titulo': new FormControl('', Validators.required),
      'detalle': new FormControl('', [Validators.required, Validators.minLength(15)]),
      'organizacionValoracion': new FormControl('', Validators.required),
      'ambienteValoracion': new FormControl('', Validators.required),
      'recorridoValoracion': new FormControl('', Validators.required),
    });

    // PENDIENTE CARGAR ARCTIVIDADES DEL USUARIO
    this.listaActividades = [
      {nombre: 'Ruta1'},
      {nombre: 'Ruta2'},
      {nombre: 'Ruta3'},
      {nombre: 'Ruta4'}
    ];
  }

  ngOnDestroy() {
    this.subscriptionAccessToken.unsubscribe();
    this.subscriptionUsuarioLogado.unsubscribe();
  }

  public enviarOpinion(): void {

    this.opinion = this.formularioOpinion.value;
    this.opinion.fecha = new Date();
    this.opinion.usuarioOpinion = this.usuario.id;

    console.log('Opinion: ', this.opinion);

    this.opinionesService.guardarOpinion(this.opinion, this.accessToken).subscribe(response => {
        console.log('OpiniónComp: RespuestaGuardarOpinion ' + response.status);
      });

    // MOSTRAR MENSAJE DE QUE SE HA ENVIADO!!

  }

}

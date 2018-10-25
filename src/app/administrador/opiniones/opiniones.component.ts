import { Component, OnInit } from '@angular/core';

// Componentes
import { Opinion } from '../../modelos/opinion.model';

// Servicio
import { OpinionesService } from '../../servicios/opiniones.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';


@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.css']
})

export class OpinionesComponent implements OnInit {

  public listaOpiniones: Array<Opinion> = [];
  private accessToken: string;

  constructor(private opinionesService: OpinionesService,
              private usuarioSesionService: UsuarioSesionService) { }

  ngOnInit() {

    this.usuarioSesionService.obtenerAccessToken$().subscribe( (accessToken: string) => {
      this.accessToken = accessToken;
    });

    this.opinionesService.obtenerOpiniones().subscribe( (listaOpiniones: Array<Opinion>) => {
      this.listaOpiniones = listaOpiniones;
    });
  }

  public borrarOpinion(idOpinion: string, accessToken: string)  {
    this.opinionesService.borrarOpinion(idOpinion, this.accessToken).subscribe( response => {
      console.log('Response:', response.status);
    });
  }

}

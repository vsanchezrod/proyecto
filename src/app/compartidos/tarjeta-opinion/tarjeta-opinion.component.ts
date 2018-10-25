import { Component, OnInit, Input } from '@angular/core';

// Modelos
import { Opinion } from '../../modelos/opinion.model';
import { Usuario } from '../../modelos/usuario.model';

// Servicio
import { UsuariosService } from '../../servicios/usuarios.service';


@Component({
  selector: 'app-tarjeta-opinion',
  templateUrl: './tarjeta-opinion.component.html',
  styleUrls: ['./tarjeta-opinion.component.css']
})
export class TarjetaOpinionComponent implements OnInit {

  // Se recibe el valor del elemento padre
  @Input() opinion: Opinion;
  public usuario: Usuario;
  public idUsuario: string;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {

    this.idUsuario = this.opinion.usuarioOpinion;

    this.usuariosService.buscarUsuarioPorId(this.idUsuario).subscribe( (usuarioCreacion: Usuario) => {
      this.usuario = usuarioCreacion;
    });

  }

}

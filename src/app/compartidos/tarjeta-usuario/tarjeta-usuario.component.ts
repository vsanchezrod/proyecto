import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

// Componente
import { Usuario } from '../../modelos/usuario.model';


@Component({
  selector: 'app-tarjeta-usuario',
  templateUrl: './tarjeta-usuario.component.html',
  styleUrls: ['./tarjeta-usuario.component.css']
})
export class TarjetaUsuarioComponent implements OnInit {

  @Input() usuario: Usuario;
  public fechaNacimientoUsuario: string;
  public esAdministrador: boolean;

  constructor() { }

  ngOnInit() {

    this.esAdministrador = false;
    this.fechaNacimientoUsuario = moment(this.usuario.fechaNacimiento).locale('es').format('d/MM/YYYY');

    if (this.usuario.roles.includes('administrador')) {
      this.esAdministrador = true;
    }
  }

}

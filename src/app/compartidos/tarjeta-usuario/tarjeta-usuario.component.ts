import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

// Componente
import { Usuario } from '../../modelos/usuario.model';

// Servicios
import { UsuariosService } from '../../servicios/usuarios.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';

import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tarjeta-usuario',
  templateUrl: './tarjeta-usuario.component.html',
  styleUrls: ['./tarjeta-usuario.component.css']
})
export class TarjetaUsuarioComponent implements OnInit {

  @Input() usuario: Usuario;
  @Input() usuarioLogado: Usuario;
  public fechaNacimientoUsuario: string;
  public esAdministrador: boolean;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {

    console.log('Usuario: ', this.usuario.id);

    this.esAdministrador = false;
    this.fechaNacimientoUsuario = moment(this.usuario.fechaNacimiento).locale('es').format('d/MM/YYYY');

    if (this.usuario.roles.includes('administrador')) {
      this.esAdministrador = true;
    }
  }

  public actualizarAAdmin(admin: boolean): void {
    console.log('ADMIN:', admin);
    if (admin) {
      this.usuario.roles.push('administrador');
      console.log('ROLES TRUE: ', this.usuario.roles);
    } else {
      const posicionRolAdministrador = this.usuario.roles.indexOf('administrador');
      this.usuario.roles.splice(posicionRolAdministrador, 1);
      console.log('POSICION: ', posicionRolAdministrador);
      console.log('ROLES FALSE: ', this.usuario.roles);
    }

    // CAMBIAR ESTO
    this.usuariosService.editarRolUsuario(this.usuario).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
      }
    );
  }

  public borrarUsuario(idUsuario: string) {
    this.usuariosService.borrarUsuario(idUsuario).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
      }
    );
  }

}

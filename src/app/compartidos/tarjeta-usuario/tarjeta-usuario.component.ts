import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

// Componente
import { Usuario } from '../../modelos/usuario.model';

// Servicios
import { UsuariosService } from '../../servicios/usuarios.service';

import { HttpResponse } from '@angular/common/http';


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

    this.esAdministrador = false;
    this.fechaNacimientoUsuario = moment(this.usuario.fechaNacimiento).locale('es').format('d/MM/YYYY');

    if (this.usuario.roles.includes('administrador')) {
      this.esAdministrador = true;
    }
  }

  public actualizarAAdmin(admin: boolean): void {
    if (admin) {
      this.usuario.roles.push('administrador');
    } else {
      const posicionRolAdministrador = this.usuario.roles.indexOf('administrador');
      this.usuario.roles.splice(posicionRolAdministrador, 1);
    }

    this.usuariosService.editarRolUsuario(this.usuario).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        this.usuariosService.obtenerListaUsuarios$().subscribe(
          (usuarios) => {
            console.log('Usuario editado');
          }
        );
      }
    );
  }

  public borrarUsuario(idUsuario: string) {

    this.usuariosService.borrarUsuario(idUsuario).subscribe(
        (response: HttpResponse<any>) => {
          console.log(response);
          this.usuariosService.obtenerListaUsuarios$().subscribe(
            (usuarios) => {
              console.log('Usuario borrado');
          }
        );
      }
    );
  }
}

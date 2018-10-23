import { Component, OnInit } from '@angular/core';

// Componente
import { Usuario } from '../../modelos/usuario.model';

// Servicio
import { UsuariosService } from '../../servicios/usuarios.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public listaUsuarios: Array<Usuario> = [];
  public usuario: Usuario;

  private accessToken: string;

  constructor(private usuariosService: UsuariosService,
              private usuarioSesionService: UsuarioSesionService) { }

  ngOnInit() {

    // Obtener token de acceso
    this.usuarioSesionService.obtenerAccessToken$().subscribe( (accessToken: string) => {
      this.accessToken = accessToken;
    });

    // Obtener el usuario logado
    this.usuarioSesionService.obtenerUsuario$().subscribe( (usuario: Usuario) => {
      this.usuario = usuario;
    });

    // Obtener lista de usuarios
    this.usuariosService.obtenerListaUsuarios$(this.accessToken).subscribe( (listaUsuarios: Array<Usuario>) => {
      this.listaUsuarios = listaUsuarios;
      console.log('AdminUsuariosComp: listaUsuarios', this.listaUsuarios);
    });
  }

}

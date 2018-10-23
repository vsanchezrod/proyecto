import { Component, OnInit } from '@angular/core';

// Modelo
import { Usuario} from '../../modelos/usuario.model';

// Servicio
import { UsuariosService } from '../../servicios/usuarios.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';


@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.css']
})
export class AmigosComponent implements OnInit {

  listaUsuarios: Array<Usuario>;
  listaUsuariosBusqueda: Array<Usuario>;
  listaAmigos: Array<Usuario>;

  private accessToken: string;
  usuario: Usuario;

  constructor(private usuariosService: UsuariosService,
              private usuarioSesionService: UsuarioSesionService) { }

  ngOnInit() {

    this.listaUsuarios = [];
    this.listaUsuariosBusqueda = [];
    this.listaAmigos = [];

    this.usuarioSesionService.obtenerAccessToken$().subscribe( (accesToken: string ) => {
      this.accessToken = accesToken;
      console.log('Amigos Component: accessToken: ' , this.accessToken);
    });

    this.usuarioSesionService.obtenerUsuario$().subscribe ( (usuario: Usuario) => {
      this.usuario = usuario;
      console.log('Amigos Component: usuario: ' , this.usuario);
      console.log('Amigos', this.usuario.amigos);

      // Carga de los datos de cada amigo
      for (const idAmigo of this.usuario.amigos) {
        this.usuariosService.buscarUsuarioPorId(idAmigo).subscribe( (amigo: Usuario) => {
          this.listaAmigos.push(amigo);
        });
      }

    });

    // Obtener lista de usuarios
    this.usuariosService.obtenerListaUsuarios$(this.accessToken).subscribe( (listaUsuarios: Array<Usuario>) => {
      this.listaUsuarios = listaUsuarios;
      console.log('AmigosUserComp: listaUsuarios', this.listaUsuarios);
    });
  }

  // VER DE CUAL DE LAS DOS MANERAS LO HAGO

  buscarAtletas(clave: string) {
    console.log('La clave es: ' + clave);
    this.listaUsuariosBusqueda = [];
    for (const usuario of this.listaUsuarios) {
      console.log(usuario.nombre);
      if (usuario.nombre.includes(clave)) {
        this.listaUsuariosBusqueda.push(usuario);
      }
      console.log('Longitud del array de busqueda');
      console.log(this.listaUsuariosBusqueda.length);
    }
    /*this.usuariosService.buscarUsuarioPorNombre(clave).subscribe( response => {
      console.log(response);
    });*/
  }

}

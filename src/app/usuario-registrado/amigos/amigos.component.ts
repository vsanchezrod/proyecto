import { Component, OnInit, OnDestroy } from '@angular/core';

// Modelo
import { Usuario} from '../../modelos/usuario.model';

// Servicio
import { UsuariosService } from '../../servicios/usuarios.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';

import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.css']
})
export class AmigosComponent implements OnInit, OnDestroy {

  public listaUsuarios: Array<Usuario>;
  public listaUsuariosBusqueda: Array<Usuario>;
  public listaAmigos: Array<Usuario>;

  public usuario: Usuario;

  private subscriptionUsuarioLogado: Subscription;
  private subscriptionListaAmigos: Subscription;

  constructor(private usuariosService: UsuariosService,
              private usuarioSesionService: UsuarioSesionService) { }

  ngOnInit() {

    this.listaUsuarios = [];
    this.listaUsuariosBusqueda = [];
    this.listaAmigos = [];

    this.subscriptionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe ( (usuario: Usuario) => {
      this.usuario = usuario;

      // Carga de los datos de cada amigo
      for (const idAmigo of this.usuario.amigos) {
        this.subscriptionListaAmigos = this.usuariosService.buscarUsuarioPorId(idAmigo).subscribe( (amigo: Usuario) => {
          this.listaAmigos.push(amigo);
        });
      }

    });

    // Obtener lista de usuarios
    this.usuariosService.obtenerListaUsuarios$().subscribe( (listaUsuarios: Array<Usuario>) => {
      this.listaUsuarios = listaUsuarios;
      console.log('Lista de USUARIOS: listaUsuarios', this.listaUsuarios);
    });
  }


  ngOnDestroy() {
    this.subscriptionUsuarioLogado.unsubscribe();
    this.subscriptionListaAmigos.unsubscribe();
  }

  // VER DE CUAL DE LAS DOS MANERAS LO HAGO
  public buscarAtletas(clave: string): void {
    console.log('La clave es: ' + clave);
    this.listaUsuariosBusqueda = [];

    if (clave !== '') {
      for (const usuarioBuscado of this.listaUsuarios) {
        console.log(usuarioBuscado.nombre);
        if (usuarioBuscado.nombre.includes(clave)) {
          this.listaUsuariosBusqueda.push(usuarioBuscado);
        }
      }
    }

    // BEHAVIOR SUBJECT????
    /*this.usuariosService.buscarUsuarioPorNombre(clave).subscribe( response => {
      console.log(response);
    });*/
  }

  public agregarAmigo(idUsuarioAAgregar: string): void {

    if (this.usuario.amigos.includes(idUsuarioAAgregar)) {
      alert('Ese usuario ya es tu amigo');
    } else {
      if (this.usuario.id === idUsuarioAAgregar) {
        alert('No te puedes agregar a ti mismo!!!');
      } else {
        this.usuario.amigos.push(idUsuarioAAgregar);
        this.usuariosService.actualizarUsuario(this.usuario).subscribe(
          (response: HttpResponse<Usuario>) => {
            console.log(response);
          }
        );
      }
    }
  }

  public borrarAmigo(idUsuarioAAgregar: string): void {

    const posicionElementoAEliminar = this.usuario.amigos.indexOf(idUsuarioAAgregar);
    this.usuario.amigos.splice(posicionElementoAEliminar, 1);
    this.usuariosService.actualizarUsuario(this.usuario).subscribe(
      (response: HttpResponse<Usuario>) => {
        console.log(response);
      }
    );
  }
}

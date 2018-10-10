import { Component, OnInit } from '@angular/core';

// Modelo
import { Usuario} from '../../modelos/usuario.model';

// Servicio
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.css']
})
export class AmigosComponent implements OnInit {

  amigos: Array<string>;
  listaUsuarios: Array<Usuario>;
  listaUsuariosBusqueda: Array<Usuario>;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {

    this.amigos = [];
    this.listaUsuarios = [];
    this.listaUsuariosBusqueda = [];

    this.usuariosService.obtenerListaUsuarios().subscribe(response => {
      this.listaUsuarios = response.body;
      console.log(this.listaUsuarios);
    });
  }

  // VER DE CUAL DE LAS DOS MANERAS LO HAGO

  buscarAtletas(clave: string) {
    console.log('La clave es: ' + clave);
    this.listaUsuariosBusqueda = [];
    for (const usuario of this.listaUsuarios) {
      console.log(usuario.nombre);
      if(usuario.nombre.includes(clave)) {
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

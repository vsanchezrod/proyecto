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

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {

    this.amigos = [];
    this.listaUsuarios = [];
    this.usuariosService.obtenerListaUsuarios().subscribe(response => {
      this.listaUsuarios = response.body;
    });
  }

}

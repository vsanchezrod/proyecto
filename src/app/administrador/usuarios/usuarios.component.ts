import { Component, OnInit } from '@angular/core';

// Componente
import { Usuario } from '../../modelos/usuario.model';

// Servicio
import { UsuariosService } from '../../servicios/usuarios.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listaUsuarios: Array<Usuario> = [];

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {

    this.usuariosService.obtenerListaUsuarios().subscribe(response => {
      this.listaUsuarios = response.body;
    });
  }

}

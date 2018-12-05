import { Component, OnInit, OnDestroy } from '@angular/core';

// Componente
import { Usuario } from '../../modelos/usuario.model';

// Servicio
import { UsuariosService } from '../../servicios/usuarios.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public listaUsuarios: Array<Usuario> = [];
  public usuarioLogado: Usuario;

  private subscriptionUsuarioLogado: Subscription;


  constructor(private usuariosService: UsuariosService,
              private usuarioSesionService: UsuarioSesionService) { }

  ngOnInit() {

    // Obtener el usuario logado
    this.subscriptionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe( (usuario: Usuario) => {
      this.usuarioLogado = usuario;
    });

    // Obtener lista de usuarios
    this.usuariosService.obtenerListaUsuarios$().subscribe( (listaUsuarios: Array<Usuario>) => {
      this.listaUsuarios = listaUsuarios;
    });
  }

  ngOnDestroy() {
    this.subscriptionUsuarioLogado.unsubscribe();
  }
}

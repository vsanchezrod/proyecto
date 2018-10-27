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
  public usuario: Usuario;

  private accessToken: string;
  private subscriptionAccessToken: Subscription;
  private subscriptionUsuarioLogado: Subscription;


  constructor(private usuariosService: UsuariosService,
              private usuarioSesionService: UsuarioSesionService) { }

  ngOnInit() {

    // Obtener token de acceso
    this.subscriptionAccessToken = this.usuarioSesionService.obtenerAccessToken$().subscribe( (accessToken: string) => {
      this.accessToken = accessToken;
    });

    // Obtener el usuario logado
    this.subscriptionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe( (usuario: Usuario) => {
      this.usuario = usuario;
    });

    // Obtener lista de usuarios
    this.usuariosService.obtenerListaUsuarios$(this.accessToken).subscribe( (listaUsuarios: Array<Usuario>) => {
      this.listaUsuarios = listaUsuarios;
      console.log('AdminUsuariosComp: listaUsuarios', this.listaUsuarios);
    });
  }

  ngOnDestroy() {
    this.subscriptionAccessToken.unsubscribe();
    this.subscriptionUsuarioLogado.unsubscribe();
  }
}

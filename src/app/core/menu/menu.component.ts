import { Component, OnInit } from '@angular/core';

// Modelos
import { Usuario } from '../../modelos/usuario.model';

// Para navegar por rutas
import { Router } from '@angular/router';

// Servicios
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuarioLogado: boolean;
  usuario: Usuario;

  constructor(private router: Router,
              private usuarioSesionService: UsuarioSesionService) { }

  ngOnInit() {

    this.usuarioSesionService.obtenerAccessToken$().subscribe((accessToken: string) => {
      // Si no es null, undefined o vacío
      this.usuarioLogado = accessToken ? true : false;
    });

    this.usuarioSesionService.obtenerUsuario$().subscribe( (usuario: Usuario) => {
      this.usuario = usuario;
    });

  }

  buscarActividades(clave: string) {
    this.router.navigate(['/busqueda', clave]);
  }
}

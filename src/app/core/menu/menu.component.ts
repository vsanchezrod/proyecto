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

  public usuarioLogado: boolean;

  constructor(private router: Router,
              private usuarioSesionService: UsuarioSesionService) { }

  ngOnInit() {

    this.usuarioSesionService.obtenerAccessToken$().subscribe((accessToken: string) => {
      // Si no es null, undefined o vacío
      this.usuarioLogado = accessToken ? true : false;
      console.log('MENUCOMP: usuarioLogado: ', this.usuarioLogado);
    });

  }

  buscarActividades(clave: string) {
    this.router.navigate(['/busqueda', clave]);
  }
}

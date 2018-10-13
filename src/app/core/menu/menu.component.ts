import { Component, OnInit } from '@angular/core';

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

  constructor(private router: Router,
              private usuarioSesionService: UsuarioSesionService) { }

  ngOnInit() {

    this.usuarioSesionService.accessToken$.subscribe((accessToken: string) => {
      // Si no es null, undefined o vacío
      console.log('MenuComponent:ngOnInit:accessToken:' , accessToken);
      this.usuarioLogado = accessToken ? true : false;
      console.log('BOOLEAN: ' , this.usuarioLogado);
    });

  }

  buscarActividades(clave: string) {
    this.router.navigate(['/busqueda', clave]);
  }
}

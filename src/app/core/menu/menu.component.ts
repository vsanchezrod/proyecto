import { Component, OnInit, OnDestroy } from '@angular/core';

// Para navegar por rutas
import { Router } from '@angular/router';

// Servicios
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  public usuarioLogado: boolean;
  private subscriptionAccessToken: Subscription;

  constructor(private router: Router,
              private usuarioSesionService: UsuarioSesionService) { }

  ngOnInit() {

    this.subscriptionAccessToken = this.usuarioSesionService.obtenerAccessToken$().subscribe((accessToken: string) => {
      // Si no es null, undefined o vacío
      this.usuarioLogado = accessToken ? true : false;
      console.log('MENUCOMP: usuarioLogado: ', this.usuarioLogado);
    });

  }

  ngOnDestroy() {
    this.subscriptionAccessToken.unsubscribe();
  }

  public buscarActividades(clave: string) {
    this.router.navigate(['/busqueda'], {queryParams: { nombre: clave }});
  }
}

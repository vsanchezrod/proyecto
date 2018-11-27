import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { UsuarioSesionService } from './usuario-sesion.service';


@Injectable({
  providedIn: 'root'
})
export class GuardianDeRutasService implements CanActivate {

  public usuarioLogado: boolean;

  constructor(private router: Router,
              private usuarioSesionService: UsuarioSesionService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    this.usuarioSesionService.obtenerAccessToken$().subscribe((accessToken: string) => {
      // Si no es null, undefined o vacío
      this.usuarioLogado = accessToken ? true : false;
      console.log('MENUCOMP: usuarioLogado: ', this.usuarioLogado);
    });

    if (this.usuarioLogado) {
      return true;
    } else {
      this.router.navigateByUrl('/login', {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';

// Formularios - Aproximación por DATA
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Para redirrecionar
import { Router } from '@angular/router';

// Servicio
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public formularioLogin: FormGroup;
  private suscripcion: Subscription;

  constructor(private usuarioSesionService: UsuarioSesionService,
              private router: Router) {
                console.log('CONSTRUCTOR LOGIN');
               }

  ngOnInit() {

    console.log('ONINIT LOGIN');

    this.formularioLogin = new FormGroup({
      'email': new FormControl('', [Validators.required , Validators.email]),
      'password': new FormControl('', Validators.required),
    });

  }

  public login(): void {

    const email = this.formularioLogin.controls['email'].value;
    const password = this.formularioLogin.controls['password'].value;

    this.suscripcion = this.usuarioSesionService.login(email, password)
      .subscribe(
        (response) => {
          console.log('LoginComponent:login:response: ', response);
          this.router.navigate(['/inicio']);
          this.suscripcion.unsubscribe();
        },
        (errorResponse) => {
          console.error('LoginComponent:login:responseError: ', errorResponse);
          alert(errorResponse['error']['error_description']);
        },
        () => {
          console.log('3 METODOOOOOOOOOOOOOOOOOOO');
        }
      );
  }

  ngOnDestroy() {
    console.log('Destruyendo LOGIN');
    this.suscripcion.unsubscribe();
    console.log('Destruyendo LOGIN2');
  }

}

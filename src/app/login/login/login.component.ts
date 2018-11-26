import { Component, OnInit } from '@angular/core';

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
export class LoginComponent implements OnInit {

  public formularioLogin: FormGroup;
  public credencialesValidas: boolean;
  private subscripcionLogin: Subscription;

  constructor(private usuarioSesionService: UsuarioSesionService,
              private router: Router) {}

  ngOnInit() {

    this.credencialesValidas = true;

    // Formulario de login
    this.formularioLogin = new FormGroup({
      'email': new FormControl('', [Validators.required , Validators.email]),
      'password': new FormControl('', Validators.required),
    });

  }

  public login(): void {

    const email = this.formularioLogin.controls['email'].value;
    const password = this.formularioLogin.controls['password'].value;

    this.subscripcionLogin = this.usuarioSesionService.login(email, password)
      .subscribe(
        (response) => {
          console.log('Login response: ', response);
          this.router.navigate(['/inicio']);
          this.subscripcionLogin.unsubscribe();
        },
        (errorResponse) => {
          console.error('Login error: ', errorResponse);
          this.formularioLogin.reset();
          this.credencialesValidas = false;
        }
      );
  }
}

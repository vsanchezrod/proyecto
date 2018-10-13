import { Component, OnInit } from '@angular/core';

// Formularios - Aproximación por DATA
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Para redirrecionar
import { Router } from '@angular/router';

// Servicio
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;

  constructor(private usuarioSesionService: UsuarioSesionService,
              private router: Router) { }

  ngOnInit() {

    this.formularioLogin = new FormGroup({
      'email': new FormControl('', [Validators.required , Validators.email]),
      'password': new FormControl('', Validators.required),
    });

  }

  public login(): void {

    const email = this.formularioLogin.controls['email'].value;
    const password = this.formularioLogin.controls['password'].value;

    this.usuarioSesionService.login(email, password)
      .subscribe(
        (response) => {
          console.log('LoginComponent:login:response: ', response);

          if(response.status === 200) {
            this.router.navigate(['/inicio']);
          }
          else {
            alert(response['error']['error_description']);
          }
        },
        (errorResponse) => {
          console.error('LoginComponent:login:responseError: ', errorResponse);
        }
      );
  }

}

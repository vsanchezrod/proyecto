import { Component, OnInit } from '@angular/core';

// Formularios - Aproximación por DATA
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;

  constructor() { }

  ngOnInit() {

    this.formularioLogin = new FormGroup({

      'email': new FormControl('', [Validators.required , Validators.email]),
      'password': new FormControl('', Validators.required),
      'recuerdame': new FormControl()
    });

  }

  enviarDatos() {
    console.log(this.formularioLogin.value);
  }
}

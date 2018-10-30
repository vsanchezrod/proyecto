import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulo de las rutas
import { RouterModule } from '@angular/router';

// Modulos para Componentes de PrimeNG
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';


// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Componentes
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    InputMaskModule,
    RadioButtonModule,
    DropdownModule,
    FileUploadModule,
    ButtonModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule
  ],
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
})
export class LoginModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Rutas
import { AppRoutingModule } from './app.routes';

// Módulos propios
import { CoreModule } from './core/core.module';
import { InicioModule } from './inicio/inicio.module';
import { ViajesModule } from './viajes/viajes.module';
import { ActividadesModule } from './actividades/actividades.module';
import { CalendarioModule } from './calendario/calendario.module';
import { AcercaDeModule } from './acerca-de/acerca-de.module';
import { CompartidosModule } from './compartidos/compartidos.module';
import { LoginModule } from './login/login.module';
import { UsuarioRegistradoModule } from './usuario-registrado/usuario-registrado.module';
import { AdministradorModule } from './administrador/administrador.module';

import { ValidacionPersonificadaDirective } from './compartidos/validacion-personificada.directive';

// Otros módulos
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modulos para Componentes de PrimeNG
import { ScheduleModule } from 'primeng/schedule';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
  declarations: [
    AppComponent,
    BusquedaComponent,
    ValidacionPersonificadaDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    InicioModule,
    ViajesModule,
    ActividadesModule,
    CalendarioModule,
    AcercaDeModule,
    CompartidosModule,
    ScheduleModule,
    LoginModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UsuarioRegistradoModule,
    AdministradorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

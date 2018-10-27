import { Component, OnInit, OnDestroy } from '@angular/core';

// Modelos
import { Usuario } from '../../modelos/usuario.model';
import { Provincia } from '../../modelos/provincia.model';

// Servicios
import { ProvinciasService } from '../../servicios/provincias.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {

  usuario: Usuario;
  accessToken: String;
  listaProvincias: Array<Provincia> = [];
  usuarioLogado: boolean;

  imagen: string | ArrayBuffer;
  progreso: number;
  mostrarSpinner: boolean;

  private subscriptionAccessToken: Subscription;
  private subscriptionUsuarioLogado: Subscription;

  constructor(private provinciasService: ProvinciasService,
              private usuarioSesionService: UsuarioSesionService) {}

  ngOnInit() {

    this.subscriptionAccessToken = this.usuarioSesionService.obtenerAccessToken$().subscribe ( accessToken => {
      this.accessToken = accessToken;
      // Si no es null, undefined o vacío
      this.usuarioLogado = accessToken ? true : false;
    });

    this.subscriptionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe ( usuario => {
      this.usuario = usuario;
    });

    this.provinciasService.obtenerProvincias().subscribe(response => {
      this.listaProvincias = response.body;
    });
  }

  ngOnDestroy() {
    this.subscriptionAccessToken.unsubscribe();
    this.subscriptionUsuarioLogado.unsubscribe();
  }

  public cargarImagen(event: Event): void {
    console.log(event);
    const inputValue: any = event.target;
    const fichero: File = inputValue.files[0];
    const fileReader: FileReader = new FileReader();

    fileReader.onerror = (evento) => {
      this.progreso = 0;
      this.mostrarSpinner = false;
    };

    fileReader.onabort = () => {
      this.progreso = 0;
      this.mostrarSpinner = false;
    };

    fileReader.onloadend = (evento) => {
      this.imagen = fileReader.result;
      this.usuario.avatar = this.imagen;
      this.progreso = 100;
      this.mostrarSpinner = false;
    };

    fileReader.onprogress = (progressEvent) => {
      this.progreso = progressEvent.loaded / progressEvent.total * 100;
    };

    this.progreso = 0;
    fileReader.readAsDataURL(fichero);
    this.mostrarSpinner = true;
  }

}

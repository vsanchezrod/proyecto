import { Component, OnInit } from '@angular/core';

// Modelos
import { Usuario } from '../../modelos/usuario.model';
import { Provincia } from '../../modelos/provincia.model';

// Servicios
import { ProvinciasService } from '../../servicios/provincias.service';
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  listaProvincias: Array<Provincia> = [];
  usuarioLogado: boolean;

  imagen: string;
  progreso: number;
  mostrarSpinner: boolean;

  constructor(private provinciasService: ProvinciasService,
              private usuarioSesionService: UsuarioSesionService) {}

  ngOnInit() {

    this.usuarioSesionService.obtenerAccessToken$().subscribe((accessToken: string) => {
      // Si no es null, undefined o vacío
      this.usuarioLogado = accessToken ? true : false;
      console.log('PERFIL: usuariLogado: ', this.usuarioLogado);
    });

    this.usuarioSesionService.obtenerUsuario$().subscribe( (usuario: Usuario) => {
      this.usuario = usuario;
      console.log('PERFIL: obtenerUsuario:' , this.usuario);
    });

    this.provinciasService.obtenerProvincias().subscribe(response => {
      this.listaProvincias = response.body;
    });
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

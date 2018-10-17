import { Component, OnInit } from '@angular/core';

// Componentes
import { Actividad } from '../../modelos/actividad.model';

// Modelos
import { Usuario } from '../../modelos/usuario.model';

// Servicios
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';
import { ActividadesService } from '../../servicios/actividades.service';


@Component({
  selector: 'app-actividades-propuestas',
  templateUrl: './actividades-propuestas.component.html',
  styleUrls: ['./actividades-propuestas.component.css']
})
export class ActividadesPropuestasComponent implements OnInit {

  public salida: Actividad = new Actividad();
  public usuario: Usuario;
  private accessToken: string;

  constructor(private usuarioSesionService: UsuarioSesionService,
              private actividadesService: ActividadesService) { }

  ngOnInit() {

    // Obtener token de acceso
    this.usuarioSesionService.obtenerAccessToken$().subscribe(accessToken => {
      this.accessToken = accessToken;
      console.log('ActivProp:ObtenerAccessToken: accesstoken', accessToken);
    });

    // Obtener el usuario logado
    this.usuarioSesionService.obtenerUsuario$().subscribe(usuario => {
      this.usuario = usuario;
      console.log('ActivProp:ObtenerUsuario: USUARIO', usuario);
    });

  }

}

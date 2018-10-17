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
  public listaMisActividadesPropuestas: Array<Actividad>;

  private accessToken: string;

  constructor(private usuarioSesionService: UsuarioSesionService,
              private actividadesService: ActividadesService) { }

  ngOnInit() {

    // Obtener token de acceso
    this.usuarioSesionService.obtenerAccessToken$().subscribe( (accessToken: string) => {
      this.accessToken = accessToken;
      console.log('ActivProp:ObtenerAccessToken: accesstoken', accessToken);
    });

    // Obtener el usuario logado
    this.usuarioSesionService.obtenerUsuario$().subscribe( (usuario: Usuario) => {
      this.usuario = usuario;
      console.log('ActivProp:ObtenerUsuario: USUARIO', usuario);
    });

    // Obtener la lista de actividades creadas por el usuario
    this.actividadesService.buscarActividadesCreadasPorUnUsuario(this.usuario.id, this.accessToken).subscribe( (listaActividades: Array<Actividad>) => {
      this.listaMisActividadesPropuestas = listaActividades;
    });
  }

  private cargarActividad(actividad): void {
    console.log('ACTIVIDAD PARA CARGAR: ' , actividad);
    this.salida = actividad;
  }



}

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
    });

    // Obtener el usuario logado
    this.usuarioSesionService.obtenerUsuarioLogado$().subscribe( (usuario: Usuario) => {
      this.usuario = usuario;
    });

    // Obtener la lista de actividades creadas por el usuario
    this.actividadesService.buscarActividadesCreadasPorUsuario(this.usuario.id, this.accessToken).subscribe( (listaActividades: Array<Actividad>) => {
      this.listaMisActividadesPropuestas = listaActividades;
      console.log('ActivProp: buscarActivUsuario: listaActividades: ', this.listaMisActividadesPropuestas);
    });
  }

  private cargarActividad(actividad): void {
    console.log('ACTIVIDAD PARA CARGAR: ' , actividad);
    this.salida = actividad;
  }

  public cancelarSalida(actviidad): void {
    alert('SALIDA CANCELADA');
  }


}

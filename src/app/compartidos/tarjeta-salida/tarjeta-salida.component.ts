import {Component, OnInit, Input } from '@angular/core';

// Componentes
import { Actividad } from '../../modelos/actividad.model';
import { Usuario } from '../../modelos/usuario.model';

// Servicio
import { UsuariosService } from '../../servicios/usuarios.service';

// Router para poder navegar por las diferentes rutas
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta-salida',
  templateUrl: './tarjeta-salida.component.html',
  styleUrls: ['./tarjeta-salida.component.css']
})
export class TarjetaSalidaComponent implements OnInit {

  // Se recibe el valor de salida desde fuera (elemento padre)
  @Input() salida: Actividad;
  @Input() usuario: Usuario = null;

  constructor(private router: Router,
              private usuariosService: UsuariosService) {}

  ngOnInit() {

    if (this.usuario == null) {
      this.obtenerUsuarioDeActividad(this.salida.idUsuarioCreacion);
    }
  }

  // Método para mostrar la salida
  verSalida() {
    this.router.navigate(['/salida', this.salida.id]);
  }

  private obtenerUsuarioDeActividad(idUsuario: string): void {
    this.usuariosService.buscarUsuarioPorId(idUsuario).subscribe( (usuario: Usuario) => {
      this.usuario = usuario;
    });
  }


}

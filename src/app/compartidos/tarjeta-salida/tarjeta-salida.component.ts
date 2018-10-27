import {Component, OnInit, Input, OnDestroy } from '@angular/core';

// Modelos
import { Actividad } from '../../modelos/actividad.model';
import { Usuario } from '../../modelos/usuario.model';

// Servicio
import { UsuariosService } from '../../servicios/usuarios.service';

// Router para poder navegar por las diferentes rutas
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tarjeta-salida',
  templateUrl: './tarjeta-salida.component.html',
  styleUrls: ['./tarjeta-salida.component.css']
})
export class TarjetaSalidaComponent implements OnInit, OnDestroy {

  // Se recibe el valor de salida desde fuera (elemento padre)
  @Input() salida: Actividad;
  public usuario: Usuario;
  public idUsuario: string;
  private suscripcionBuscarUsuarioPorId: Subscription;

  constructor(private router: Router,
              private usuariosService: UsuariosService) {}

  ngOnInit() {

    this.usuario = new Usuario();
    this.idUsuario = this.salida.idUsuarioCreacion;

    this.suscripcionBuscarUsuarioPorId = this.usuariosService.buscarUsuarioPorId(this.idUsuario).subscribe(
      (usuarioCreacion: Usuario) => {
        this.usuario = usuarioCreacion;
      }
    );
  }

  // Método para mostrar la salida
  verSalida() {
    this.router.navigate(['/salida', this.salida.id]);
  }

  ngOnDestroy() {
    this.suscripcionBuscarUsuarioPorId.unsubscribe();
  }

}

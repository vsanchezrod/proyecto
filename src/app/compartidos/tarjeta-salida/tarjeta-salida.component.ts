import { Component, OnInit, Input } from '@angular/core';

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
  usuario: Usuario;

  constructor(private router: Router,
              private usuariosService: UsuariosService) {}

  ngOnInit() {

    /*console.log('USUARIO CREACION: ' + this.salida.idUsuarioCreacion);
    this.usuario.id = this.salida.idUsuarioCreacion;
    this.usuariosService.obtenerUsuario(this.usuario.id).subscribe( response => {
      this.usuario = response;
      console.log('Usuario buscado');
      console.log(this.usuario);
      console.log(this.usuario.nombre);
    });*/

  }

  // Método para mostrar la salida
  verSalida() {
    this.router.navigate(['/salida', this.salida.id]);
  }

}

import { Component, OnInit } from '@angular/core';

// Modelo de datos
import { Usuario } from '../../modelos/usuario.model';
import { Mensaje } from '../../modelos/mensaje.model';
import { MenuItem } from 'primeng/api';

// Servicio
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';
import { MensajesService } from '../../servicios/mensajes.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  mensaje: Mensaje;
  usuario: Usuario;

  listaMensajes: Array<Mensaje> = [];
  listaAmigos: Array<string> = [];

  items: MenuItem[];

  private accessToken: string;

  constructor(private usuarioSesionService: UsuarioSesionService,
              private mensajesService: MensajesService,
              private messageService: MessageService) { }

  ngOnInit() {

    this.items = [
      {label: 'Borrar', icon: 'fa fa-close', command: () => {
          this.borrarMensaje(this.mensaje.id);
        }
      }
    ];

    this.usuarioSesionService.obtenerAccessToken$().subscribe( (accesToken: string ) => {
      this.accessToken = accesToken;
      console.log('Mensajes Component: accessToken: ' , this.accessToken);
    });

    this.usuarioSesionService.obtenerUsuario$().subscribe ( (usuario: Usuario) => {
      this.usuario = usuario;
      console.log('Mensajes Component: usuario: ' , this.usuario);

      this.mensajesService.obtenerListadMensajes$(this.usuario.id, this.accessToken).subscribe( (mensajes: Array<Mensaje>) => {
        this.listaMensajes = mensajes;
      });


    });

    // Para que cargue por defecto el primer mensaje ordenado por fecha
    this.mensaje = this.listaMensajes[0];

  }

  cargarMensaje(mensaje): void {
    this.mensaje = mensaje;

    // Cuando se carga el mensaje cambia el estado a LEIDO
    this.mensaje.leido = true;
  }

  responderMensaje(idUsuarioEmisor) {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data Updated'});
    console.log('Quiero responder al mensaje de ' + idUsuarioEmisor);
  }

  borrarMensaje(id): void {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data Deleted'});
    console.log('Quiero borrar el mensaje con id ' + id);
  }

  mostrarFormularioMensaje () {

  }

}


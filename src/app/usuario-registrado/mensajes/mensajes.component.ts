import { Component, OnInit, OnDestroy } from '@angular/core';

// Modelo de datos
import { Usuario } from '../../modelos/usuario.model';
import { Mensaje } from '../../modelos/mensaje.model';
import { MenuItem } from 'primeng/api';

// Servicio
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { MensajesService } from '../../servicios/mensajes.service';
import { MessageService } from 'primeng/api';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit, OnDestroy {

  public mensaje: Mensaje;
  public listaMensajes: Array<Mensaje> = [];
  public listaAmigos: Array<Usuario> = [];

  public items: MenuItem[];

  public usuario: Usuario;
  private accessToken: string;

  private subscriptionAccessToken: Subscription;
  private subscriptionUsuarioLogado: Subscription;
  private subscriptionObtenerMensajes: Subscription;

  constructor(private usuarioSesionService: UsuarioSesionService,
              private mensajesService: MensajesService,
              private messageService: MessageService,
              private usuariosService: UsuariosService) { }

  ngOnInit() {

    this.mensaje = new Mensaje();

    this.items = [
      {label: 'Borrar', icon: 'fa fa-close', command: () => {
          this.borrarMensaje(this.mensaje.id);
        }
      }
    ];

    this.subscriptionAccessToken = this.usuarioSesionService.obtenerAccessToken$().subscribe( (accesToken: string ) => {
      this.accessToken = accesToken;
    });

    this.subscriptionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe ( (usuario: Usuario) => {
      this.usuario = usuario;

      // Carga de los nombre de cada amigo en el select de mandar nuevo mensaje
      for (const idAmigo of this.usuario.amigos) {
        this.usuariosService.buscarUsuarioPorId(idAmigo).subscribe( (amigo: Usuario) => {
          this.listaAmigos.push(amigo);
        });
      }

      // Buscar los mensajes para ese usuario
      this.subscriptionObtenerMensajes = this.mensajesService.obtenerListaDeMensajes$(this.usuario.id, this.accessToken).subscribe(
        (mensajes: Array<Mensaje>) => {
          this.listaMensajes = mensajes;
      });
    });

    // Para que cargue por defecto el primer mensaje ordenado por fecha
    this.mensaje = this.listaMensajes[0];

  }

  ngOnDestroy() {
    this.subscriptionAccessToken.unsubscribe();
    this.subscriptionUsuarioLogado.unsubscribe();
    this.subscriptionObtenerMensajes.unsubscribe();
  }


  cargarMensaje(mensaje): void {
    this.mensaje = mensaje;

    // Cuando se carga el mensaje cambia el estado a LEIDO
    // TO DO - HACER UN PUT / PATCH DEL MENSAJE para cambiar el estado en la BBDD
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


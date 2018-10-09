import { Component, OnInit } from '@angular/core';

// Modelo de datos
import { Mensaje } from '../../modelos/mensaje.model';
import { MenuItem } from 'primeng/api';

// Servicio
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  mensaje: Mensaje;
  mensaje1: Mensaje;
  mensaje2: Mensaje;
  mensaje3: Mensaje;
  mensaje4: Mensaje;

  listaMensajes: Array<Mensaje> = [];

  items: MenuItem[];

  constructor(private messageService: MessageService) { }

  ngOnInit() {

    this.items = [
      {label: 'Borrar', icon: 'fa fa-close', command: () => {
          this.borrarMensaje(this.mensaje.id);
        }
      }
    ];

    this.mensaje1 = new Mensaje();
    this.mensaje1.asunto = 'Hola!!!';
    this.mensaje1.mensaje = 'lalalalalallaallallala';
    this.mensaje1.idUsuarioEmisor = '11111111111'
    this.mensaje1.fecha = new Date();
    this.listaMensajes.push(this.mensaje1);

    this.mensaje2 = new Mensaje();
    this.mensaje2.asunto = 'Adios!!!';
    this.mensaje2.mensaje = 'lililililililili';
    this.mensaje2.idUsuarioEmisor = '2222222222222'
    this.mensaje2.fecha = new Date();
    this.listaMensajes.push(this.mensaje2);

    this.mensaje3 = new Mensaje();
    this.mensaje3.asunto = '3333!!!';
    this.mensaje3.mensaje = 'lolololollolo';
    this.mensaje3.idUsuarioEmisor = '3333333333333'
    this.mensaje3.fecha = new Date();
    this.listaMensajes.push(this.mensaje3);

    this.mensaje4 = new Mensaje();
    this.mensaje4.asunto = '444444!!!';
    this.mensaje4.mensaje = 'luuuuuuuu';
    this.mensaje4.idUsuarioEmisor = '44444444'
    this.mensaje4.fecha = new Date();
    this.listaMensajes.push(this.mensaje4);

    // Para que cargue por defecto el primer mensaje ordenado por fecha
    this.mensaje = this.listaMensajes[0];
  }

  cargarMensaje(mensaje): void {
    this.mensaje = mensaje;
  }

  responderMensaje(idUsuarioEmisor) {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data Updated'});
    console.log('Quiero responder al mensaje de ' + idUsuarioEmisor);
  }

  borrarMensaje(id): void {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data Deleted'});
    console.log('Quiero borrar el mensaje con id ' + id);
  }}

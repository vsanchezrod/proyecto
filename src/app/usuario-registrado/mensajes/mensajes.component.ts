import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';

// Modelo de datos
import { Usuario } from '../../modelos/usuario.model';
import { Mensaje } from '../../modelos/mensaje.model';
import { SelectItem } from 'primeng/components/common/selectitem';

// Formularios
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Servicio
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { MensajesService } from '../../servicios/mensajes.service';
import { MessageService } from 'primeng/api';

// Peticiones Http
import { HttpResponse } from '@angular/common/http';

// Rutas
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit, OnDestroy {

  public mensaje: Mensaje;
  public listaMensajes: Array<Mensaje>;
  public listaAmigos: Array<any>;

  public crearMensaje: boolean;
  public formularioMensaje: FormGroup;

  public usuario: Usuario = new Usuario();

  private subscriptionUsuarioLogado: Subscription;
  private subscriptionObtenerMensajes: Subscription;

  constructor(private usuarioSesionService: UsuarioSesionService,
              private mensajesService: MensajesService,
              private messageService: MessageService,
              private usuariosService: UsuariosService,
              private router: Router) { }

  ngOnInit() {

    this.crearMensaje = false;
    this.mensaje = new Mensaje();
    this.listaMensajes = [];
    this.listaAmigos = [];

    this.formularioMensaje = new FormGroup({
      'idUsuarioReceptor': new FormControl('', Validators.required),
      'asunto': new FormControl('', Validators.required),
      'cuerpoMensaje': new FormControl('', Validators.required),
    });

    this.subscriptionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe ( (usuario: Usuario) => {
      this.usuario = usuario;

      // Carga de los nombre de cada amigo en el select de mandar nuevo mensaje
      for (const idAmigo of this.usuario.amigos) {
        this.usuariosService.buscarUsuarioPorId(idAmigo).subscribe(
          (amigo: Usuario) => {

            const amigoUsuario: SelectItem = {
              label: amigo.nombre,
              value: amigo
          };
          this.listaAmigos.push(amigoUsuario);
        });
      }

      // Buscar los mensajes para ese usuario
      this.subscriptionObtenerMensajes = this.mensajesService.obtenerListaDeMensajes$(this.usuario.id).subscribe(
        (mensajes: Array<Mensaje>) => {
          this.listaMensajes = mensajes;
          // Para que cargue por defecto el primer mensaje ordenado por fecha
          this.mensaje = this.listaMensajes[0];
      });
    });
  }

  ngOnDestroy() {
    this.subscriptionUsuarioLogado.unsubscribe();
    this.subscriptionObtenerMensajes.unsubscribe();
  }

  public mandarMensaje(): void {
    const mensaje: Mensaje = this.formularioMensaje.value;
    console.log('Mensaje: ', this.mostrarFormularioMensaje);
    mensaje.idUsuarioReceptor = this.formularioMensaje.controls['idUsuarioReceptor'].value['id'];
    mensaje.idUsuarioEmisor = this.usuario.id;
    mensaje.fecha = new Date();
    mensaje.leido = false;

    this.mensajesService.mandarMensaje(mensaje).subscribe(
      (response: HttpResponse<Mensaje>) => {
        console.log(response);
      }
    );
    this.mostrarFormularioMensaje(false);
  }

  public cargarMensaje(mensajeElegido: Mensaje): void {
    this.mensaje = mensajeElegido;
    if (!mensajeElegido.leido) {
      this.mensaje.leido = true;
      this.mensajesService.actualizarMensaje(this.mensaje).subscribe(
        (response: HttpResponse<Mensaje>) => {
          console.log(response);
        }
      );
    }
  }

  public mostrarFormularioMensaje(valor: boolean) {
    this.crearMensaje = valor;
  }

  public borrarMensaje(idMensaje: string): void {

    this.mensajesService.borrarMensaje(idMensaje).subscribe(
      (response: HttpResponse<Mensaje>) => {
        console.log(response);
        this.mensajesService.obtenerListaDeMensajes$(this.usuario.id).subscribe(
          (mensajes: Array<Mensaje>) => {
            this.listaMensajes = mensajes;
            this.mensaje = this.listaMensajes[0];
        });
      }
    );

    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Data Deleted'});

  }

}


import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import * as moment from 'moment';

// Modelos
import { Viaje } from '../../modelos/viaje.model';
import { Usuario } from '../../modelos/usuario.model';
import { Pago } from '../../modelos/pago.model';

// Servicios
import { UsuarioSesionService } from '../../servicios/usuario-sesion.service';
import { ViajesService } from '../../servicios/viajes.service';

// Router para poder navegar por las diferentes rutas
import { Router} from '@angular/router';

import { Subscription } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tarjeta-viaje',
  templateUrl: './tarjeta-viaje.component.html',
  styleUrls: ['./tarjeta-viaje.component.css']
})
export class TarjetaViajeComponent implements OnInit, OnDestroy {

  // Se recibe el valor de salida desde fuera (elemento padre)
  @Input() viaje: Viaje = new Viaje();
  @Input() public fechaInicioParseada?: string;
  @Input() public fechaFinParseada?: string;
  public usuarioLogado: Usuario;
  public pago: Pago;
  public fecha: Date;

  private subscripcionUsuarioLogado: Subscription;

  constructor(private usuarioSesionService: UsuarioSesionService,
              private viajesService: ViajesService,
              private router: Router) { }

  ngOnInit() {

    this.pago = new Pago();
    this.fecha = new Date();

    this.fechaInicioParseada = moment(this.viaje.fechaInicio).locale('es').format('DD/MM/YYYY HH:mm');
    this.fechaFinParseada = moment(this.viaje.fechaFin).locale('es').format('DD/MM/YYYY HH:mm');

    this.subscripcionUsuarioLogado = this.usuarioSesionService.obtenerUsuarioLogado$().subscribe(
      (usuarioLogado: Usuario) => {
        this.usuarioLogado = usuarioLogado;
      }
    );
  }

  ngOnDestroy() {
    this.subscripcionUsuarioLogado.unsubscribe();
  }

  public mostrarBotonApuntarse(): boolean {
    if (new Date() < this.viaje.fechaInicio && !this.usuarioYaApuntado() && !this.plazasAgotadas()) {
      return true;
    }
    return false;
  }

  public plazasAgotadas(): boolean {
    return this.viaje.listaParticipantes.length >= this.viaje.plazas;
  }

  public usuarioYaApuntado(): boolean {
    if (this.usuarioLogado.id !== undefined) {
      return this.viaje.listaParticipantes.includes(this.usuarioLogado.id);
    }
    return false;
  }

  // Método para mostrar la salida
  public verViaje(): void {
    this.router.navigate(['/viaje', this.viaje.id]);
  }

  public apuntarseAViaje(): void {

    if (this.verificarPago()) {
      this.viajesService.apuntarseAViaje(this.viaje.id, this.usuarioLogado.id).subscribe(
        (response: HttpResponse<Viaje>) => {
          console.log('APUNTADO!!', response);
          this.viajesService.obtenerViajePorId$(this.viaje.id).subscribe(
            (viajeActualizado: Viaje) => {
              this.viaje = viajeActualizado;
            }
          );
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
    } else {
      console.log('No se ha podido confirmar el pago');
    }
  }

  public verificarPago(): boolean {

    if (this.pago.caducidad > this.fecha || this.pago.numeroTarjeta.toString().length < 16) {
      return true;
     } else {
      return false;
    }
  }


  public verificarLogin() {
    if (this.usuarioLogado.id === undefined) {
      this.router.navigate(['/login']);
    }
  }

}


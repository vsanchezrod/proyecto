import { Component, OnInit, Input } from '@angular/core';

// Componente
import { Usuario } from '../../modelos/usuario.model';


@Component({
  selector: 'app-tarjeta-usuario',
  templateUrl: './tarjeta-usuario.component.html',
  styleUrls: ['./tarjeta-usuario.component.css']
})
export class TarjetaUsuarioComponent implements OnInit {

  @Input() usuario: Usuario;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

// Servicio
import { ViajesService } from '../servicios/viajes.service';


@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {

  constructor(private viajesService: ViajesService) { }

  ngOnInit() {
  }

}

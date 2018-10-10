import { Component, OnInit } from '@angular/core';

// Para navegar por rutas
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  buscarActividades(clave: string) {
    this.router.navigate(['/busqueda', clave]);
  }
}

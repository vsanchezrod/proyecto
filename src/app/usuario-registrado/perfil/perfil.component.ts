import { Component, OnInit } from '@angular/core';

// Modelos
import { Usuario } from '../../modelos/usuario.model';
import { Provincia } from '../../modelos/provincia.model';

// Servicios
import { ProvinciasService } from '../../servicios/provincias.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = {
    'id': 'qewqeqe',
    'nombre': 'Vir',
    'apellido': 'Sanchez',
    'email': 'vir@vir.com',
    'password': '123456',
    'fechaNacimiento': new Date(),
    'sexo': 'mujer',
    'provincia' : {
      'codigo': 28,
      'nombre': 'Madrid'
    },
    'avatar': '../../../assets/imagenes/avatars/1.png',
    'info': 'Yihaaaaaaaaaaaaaaaaaa',
    'intereses': [],
    'terminos': true,
    'valoracion': 3,
    'roles': ['usuario']
  };

  selectedValue = this.usuario.sexo;

  listaProvincias: Array<Provincia> = [];

  constructor(private provinciasService: ProvinciasService) {}

  ngOnInit() {

    this.provinciasService.obtenerProvincias().subscribe(response => {
      this.listaProvincias = response.body;
    });
  }

}

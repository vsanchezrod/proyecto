import { Injectable } from '@angular/core';

// Peticiones HTTP
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelos
import { Provincia } from '../modelos/provincia.model';

// Servicios
import { CabecerasHttpService } from './cabeceras-http.service';

// Producción
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  constructor(private httpClient: HttpClient,
              private cabecerasHttpService: CabecerasHttpService) {}

  public obtenerProvincias(): Observable<HttpResponse<Array<Provincia>>> {
     return this.httpClient.get<Array<Provincia>>(environment.host + '/public/provincias',
       {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'response'});
  }

}

import { Injectable } from '@angular/core';

// Peticiones al API
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelos
import { Categoria } from '../modelos/categoria.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private httpClient: HttpClient) { }

  public obtenerListaCategorias(): Observable<HttpResponse<Array<Categoria>>> {

    return this.httpClient.get<Array<Categoria>>('http://localhost:8080/fitness/api/public/categorias', {observe: 'response'});

  }

  // Método para guardar una opinion
  public crearCategoria (categoria: Categoria): Observable<HttpResponse<Categoria>> {

    const body = categoria;

    const cabeceras = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.httpClient.post<Categoria>('http://localhost:8080/fitness/api/public/categorias', body, {observe: 'response'});
  }

}

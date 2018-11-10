import { Injectable } from '@angular/core';

// Peticiones HTTP
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// Modelos
import { Categoria } from '../modelos/categoria.model';

// Servicios
import { CabecerasHttpService } from './cabeceras-http.service';

// Producción
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private listaCategorias: Array<Categoria> = [];
  private listaCategorias$: BehaviorSubject<Array<Categoria>> = new BehaviorSubject(this.listaCategorias);

  constructor(private httpClient: HttpClient,
              private cabecerasHttpService: CabecerasHttpService) { }

  public obtenerListaCategorias$(): Observable<Array<Categoria>> {

    this.httpClient.get<Array<Categoria>>(environment.host + '/public/categorias',
    {headers: this.cabecerasHttpService.generarCabecerasGet(), observe: 'response'}).subscribe(response => {
      this.listaCategorias$.next(response.body);
    });
    return this.listaCategorias$.asObservable();
  }

  // Método para guardar una categoría
  public crearCategoria (categoria: Categoria): Observable<HttpResponse<Categoria>> {
    const body = categoria;
    return this.httpClient.post<Categoria>(environment.host + '/categorias',
      body, {headers: this.cabecerasHttpService.generarCabecerasPostPutPatchConAccessToken(), observe: 'response'});
  }

  // Método para borrar una categoría
  public borrarCategoria (id: string): Observable<HttpResponse<Categoria>> {
    return this.httpClient.delete<Categoria>(environment.host + `/categorias/${id}`,
      {headers: this.cabecerasHttpService.generarCabecerasGetConAccessToken(), observe: 'response'});
  }

}

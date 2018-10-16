import { Injectable } from '@angular/core';

// Peticiones HTTP
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// Modelos
import { Categoria } from '../modelos/categoria.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private listaCategorias: Array<Categoria> = [];
  private listaCategorias$: BehaviorSubject<Array<Categoria>> = new BehaviorSubject(this.listaCategorias);

  constructor(private httpClient: HttpClient) { }

  public obtenerListaCategorias$(): Observable<Array<Categoria>> {

    this.httpClient.get<Array<Categoria>>('http://localhost:8080/fitness/api/public/categorias', 
    {headers: this.generarCabeceras(), observe: 'response'}).subscribe(response => {
      this.listaCategorias$.next(response.body);
    });
    return this.listaCategorias$.asObservable();
  }

  // Método para guardar una opinion
  public crearCategoria (categoria: Categoria): Observable<HttpResponse<Categoria>> {

    const body = categoria;

    return this.httpClient.post<Categoria>('http://localhost:8080/fitness/api/public/categorias', 
      body, {headers: this.generarCabeceras(), observe: 'response'});
  }

  private generarCabeceras(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }
}

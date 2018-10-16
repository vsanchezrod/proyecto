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

  // Método para guardar una categoría
  public crearCategoria (categoria: Categoria): Observable<HttpResponse<Categoria>> {

    const body = categoria;
    return this.httpClient.post<Categoria>('http://localhost:8080/fitness/api/categorias',
      body, {headers: this.generarCabecerasConAccessToken(), observe: 'response'});
  }

  // Método para borrar una categoría
  public borrarCategoria (id: string): Observable<HttpResponse<Categoria>> {
    return this.httpClient.delete<Categoria>(`http://localhost:8080/fitness/api/categorias/${id}`,
      {headers: this.generarCabecerasConAccessToken(), observe: 'response'});
  }


  private generarCabeceras(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  private generarCabecerasConAccessToken(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidGVzdGp3dHJlc291cmNlaWQiXSwidXNlcl9uYW1lIjoiNWJjMGJlN2FkZjU1MDcxOTY0MjcwNDQ2Iiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTUzOTcyMTIzMSwiYXV0aG9yaXRpZXMiOlsiYWRtaW5pc3RyYWRvciIsInVzdWFyaW8iXSwianRpIjoiODEwZDM2YzAtYTNkZS00MDg4LWI0ODYtNTNhZWZhYjdkMTk3IiwiY2xpZW50X2lkIjoidGVzdGp3dGNsaWVudGlkIn0.p0pk1TOXsy2sg3FkQCmvk43WaJds1EW73jI1xvywHEU'
    });
  }
}

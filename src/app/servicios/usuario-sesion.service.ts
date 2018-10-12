import { Injectable } from '@angular/core';

// Peticiones HTTP
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSesionService {

  constructor(private httpClient: HttpClient) { }

  public login(email: string, password: string): Observable<any> {

    const body = {
      'grant_type': 'password',
      'username': email,
      'password': password
    }

    const cabeceras = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic  dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA=',
        'Accept': 'application/json'
      })
    }

    return this.httpClient.post('http://localhost:8080/fitness/api/oauth/token', body, {headers: cabeceras.headers});
  }

}

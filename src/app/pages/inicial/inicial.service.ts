import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InicialService {

  constructor(private http: HttpClient) { }

  listaAgendamentos() {
    console.log('oi');
    return this.http.post('/api/listaAgendamentos', '');
  }
}

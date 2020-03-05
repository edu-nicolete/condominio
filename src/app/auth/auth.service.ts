import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

interface isLoggedIn{
  status : boolean
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuthenticated() : Observable<isLoggedIn> {
    let dados = {};
    return this.http.post<isLoggedIn>('/api/verificaLogin', dados, httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  verificaUsuario(usuario, senha) {
    console.log('usuario', usuario);
    const obj = {
      login: usuario,
      senha: senha,
      campos: 'b.cpf = "' + usuario +
            '" and a.senha = "' + senha + '"',
      tabelas: 'login a, usuarios b'
    };
    console.log(obj);
    return this.http.post('/api/login', obj);
  }

  logoutAplicacao() {
    const obj = {logout: 'logout'};
    return this.http.post('/api/logout', obj);
  }
}

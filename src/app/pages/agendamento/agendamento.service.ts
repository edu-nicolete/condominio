import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(private http: HttpClient) { }

  buscaDatasIndisponiveis(id) {
    const obj = {
      id: id
    }
    return this.http.post('/api/buscaDatasAgendamento', obj);
  }

  buscaTiposAgendamento() {
    return this.http.post('/api/buscaTiposAgendamento', {});
  }

  verificaLocal(id) {
    const obj = {
      id: id
    }
    return this.http.post('/api/verificaLocal', obj);
  }

  salvarAgendamento(formulario, dataPreenchida) {
    const obj = {
      data: dataPreenchida,
      turno: formulario.escolhaTurno.value,
      status: 'Confirmado',
      localAgendamento: formulario.escolhaLocal.value,
      tipoAgendamentos: formulario.tipoAgendamento.value
    }
    return this.http.post('/api/salvarAgendamento', obj);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { InicialService } from './inicial.service';
import Chart from 'chart.js';

@Component({
  selector: "app-inicial",
  templateUrl: "inicial.component.html"
})
export class InicialComponent implements OnInit {

  private listaAgendamentosUsuario: any[];
  constructor(private serviceInicial: InicialService) {}

  ngOnInit() {
    this.listaAgendamentos();
  }

  listaAgendamentos() {
    console.log('entrou', this.serviceInicial.listaAgendamentos());
    this.serviceInicial.listaAgendamentos().subscribe((data: any) => {
      if (data.status.code === 200) {
        this.listaAgendamentosUsuario = data.data;
      } else {
        alert();
      }
    });
  }
}

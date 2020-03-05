import { Component, OnInit, ViewChild } from "@angular/core";
import Chart from 'chart.js';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Calendar } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { AgendamentoService } from './agendamento.service';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

// Display mostrado no fullcalendar
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@Component({
  selector: "app-agendamento",
  templateUrl: "agendamento.component.html",
  styleUrls: ['./agendamento.component.css']
})

export class AgendamentoComponent implements OnInit {

  // variaveis
  date = new FormControl(moment());
  events: string[] = [];
  listaDatas;
  listaTipoAgendamento = [];
  listaLocalAgendamento = [];
  agendamentoForm: FormGroup;
  message: boolean = false;
  typeAlert: string = '';
  preenchimentoData: boolean = false;
  mostraCalendario: boolean = false;
  guardaQuantidadeSelecionada: number = 0;
  messageText: string = '';
  selecaoData: string = '';

  calendarPlugins = [dayGridPlugin, interactionPlugin];
  locale = ptBrLocale;
  calendarEvents: EventInput[] = [

  ];

  constructor(
    private formBuilder: FormBuilder,
    private serviceAgendamento: AgendamentoService,
  ) {
    this.create();
    this.buscaTiposAgendamento();
  }

  ngOnInit() {}

  create() {
    this.agendamentoForm = this.formBuilder.group({
      tipoAgendamento: ['', Validators.required],
      escolhaLocal: ['', Validators.required],
      escolhaTurno: ['', Validators.required]
    });
  }

  buscaDatasIndisponiveis(id) {
    this.selecaoData = '';
    this.guardaQuantidadeSelecionada = 0;
    this.calendarEvents = [];
    console.log('id', id);
    this.mostraCalendario = false;
    if(this.agendamentoForm.controls.tipoAgendamento.status === 'VALID' && this.agendamentoForm.controls.escolhaLocal.status === 'VALID') {
      this.mostraCalendario = true;
    }
    this.message = false;
    this.calendarEvents = [];
    this.serviceAgendamento.buscaDatasIndisponiveis(id).subscribe((data: any) => {
      if (data.status.code === 200) {
        this.listaDatas = data.data;
        this.montaDatasIndisponiveis(this.listaDatas);
      } else {
        if(data.status.code !== 204 && this.agendamentoForm.controls.tipoAgendamento.status !== 'VALID' && this.agendamentoForm.controls.escolhaLocal.status !== 'VALID') {
          this.typeAlert = 'alert-danger';
          this.message = true;
          this.messageText = 'Erro ' + data.status.code + ' - ' + data.status.text;
        }
      }
    });
  }

  montaDatasIndisponiveis(listaDatas) {
    for(let i = 0; i < listaDatas.length; i++) {
      let str = this.listaDatas[i].data;
      let res = str.substring(0, 10);
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        title: 'Indisponível',
        start: res,
        color: '#f99090',
        textColor: '#fff'
      });
      this.guardaQuantidadeSelecionada = this.calendarEvents.length - 1;
    }
  }

  buscaTiposAgendamento() {
    this.calendarEvents = [];
    this.message = false;
    this.serviceAgendamento.buscaTiposAgendamento().subscribe((data: any) => {
      console.log('data', data);
      if (data.status.code === 200) {
        this.listaTipoAgendamento = data.data;
      } else {
        this.typeAlert = 'alert-danger';
        this.message = true;
        this.messageText = data.status.code + ' - ' + data.status.text;
      }
    });
  }

  verificaLocal(evento){
    this.calendarEvents = [];
    this.mostraCalendario = false;
    this.message = false;
    this.serviceAgendamento.verificaLocal(evento).subscribe((data: any) => {
      console.log('data', data);
      if (data.status.code === 200) {
        this.listaLocalAgendamento = data.data;
      } else {
        this.typeAlert = 'alert-danger';
        this.message = true;
        this.messageText = 'Erro ' + data.status.code + ' - ' + data.status.text;
      }
    });
  }

  selecionaData(arg) {
    console.log('this.calendarEvents = null;', this.guardaQuantidadeSelecionada);
    this.message = false;
    let dataAtual = new Date();
    let ano = dataAtual.getFullYear();
    let mes = dataAtual.getMonth() + 1;
    let dia = dataAtual.getDate();
    let mesValor = '';
    let diaValor = '';
    mesValor = ((mes < 10) ? '0' : '').concat(mes.toString());
    diaValor = ((dia < 10) ? '0' : '').concat(dia.toString());

    let dataAtualConvertida = ano+mesValor+diaValor;

    let anoSelecionado = arg.dateStr.slice(0, 4);
    let mesSelecionado = arg.dateStr.slice(5, 7);
    let diaSelecionado = arg.dateStr.slice(8, 10);

    let dataSelecionada = anoSelecionado+mesSelecionado+diaSelecionado;
    this.selecaoData = arg.dateStr;

    let existe = false;
    for(let i = 0; i < this.calendarEvents.length; i++){
      if (arg.dateStr === this.calendarEvents[i].start) {
        existe = true;
        return;
      }
    }

    if(!existe){
      console.log('this.guardaQuantidadeSelecionada', this.guardaQuantidadeSelecionada);
      console.log('this.calendarEvents.length', this.calendarEvents.length);
      if(this.guardaQuantidadeSelecionada >= this.calendarEvents.length && this.calendarEvents.length > 0){
        this.typeAlert = 'alert-danger';
        this.message = true;
        this.messageText = 'Só é possível selecionar uma data por agendamento.'
      }else {
        if(dataSelecionada < dataAtualConvertida) {
          this.typeAlert = 'alert-danger';
          this.message = true;
          this.messageText = 'A data selecionada deve ser maior que a data atual.'
        }else {
          this.preenchimentoData = true;
          this.message = false;
          this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
            title: 'Novo agendamento',
            start: arg.dateStr,
            allDay: arg.allDay,
            color: '#00ff6a',
            textColor: '#000'
          });
          this.guardaQuantidadeSelecionada = this.calendarEvents.length;
        }
      }
    }
  }

  salvarAgendamento(formulario) {
    let valido = true;
    if(this.agendamentoForm.controls.tipoAgendamento.status === "INVALID") {
      valido = false;
      this.typeAlert = 'alert-danger';
      this.message = true;
      this.messageText = 'É necessário selecionar um tipo de agendamento.'
    }else if(this.agendamentoForm.controls.escolhaLocal.status === "INVALID") {
      valido = false;
      this.typeAlert = 'alert-danger';
      this.message = true;
      this.messageText = 'É necessário selecionar um local.'
    }else if(!this.preenchimentoData) {
      valido = false;
      this.typeAlert = 'alert-danger';
      this.message = true;
      this.messageText = 'É necessário selecionar uma data para agendamento.'
    }else if(this.agendamentoForm.controls.escolhaTurno.status === "INVALID") {
      valido = false;
      this.typeAlert = 'alert-danger';
      this.message = true;
      this.messageText = 'É necessário selecionar um turno que pretende inciar.'
    }

    if(valido) {
      console.log('confirmado');
      this.serviceAgendamento.salvarAgendamento(this.agendamentoForm.controls, this.selecaoData).subscribe((data: any) => {
        console.log('data', data);
        if (data.status.code === 200) {
          this.typeAlert = 'alert-success';
          this.message = true;
          this.messageText = 'Agendamento realizado com sucesso.'
            setTimeout(() => {
              this.buscaDatasIndisponiveis(this.agendamentoForm.value.escolhaLocal);
            }, 1000);
        } else {
          this.typeAlert = 'alert-danger';
          this.message = true;
          this.messageText = 'Erro ' + data.status.code + ' - ' + data.status.text;
        }
      });
    }

  }
}

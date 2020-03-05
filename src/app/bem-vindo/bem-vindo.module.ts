import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BemVindoLayoutRoutes } from "./bem-vindo.routing";
import { AgendamentoComponent } from "../pages/agendamento/agendamento.component";
import { InicialComponent } from "../pages/inicial/inicial.component";
import { IconsComponent } from "../pages/icons/icons.component";
import { MapComponent } from "../pages/map/map.component";
import { UserComponent } from "../pages/user/user.component";
import { TablesComponent } from "../pages/tables/tables.component";
import { TypographyComponent } from "../pages/typography/typography.component";
import { InicialService } from '../pages/inicial/inicial.service';
import { AgendamentoService } from '../pages/agendamento/agendamento.service';
import { FullCalendarModule } from '@fullcalendar/angular';
// import { RtlComponent } from "../../pages/rtl/rtl.component";
import {    MatDatepickerModule,
   MatNativeDateModule,
   MatFormFieldModule,
   MatInputModule } from '@angular/material';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BemVindoLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FullCalendarModule
  ],
  declarations: [
    AgendamentoComponent,
    InicialComponent,
    UserComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    MapComponent,
    // RtlComponent
  ],
  providers: [
    InicialService,
    AgendamentoService
  ]
})
export class BemVindoLayoutModule {}

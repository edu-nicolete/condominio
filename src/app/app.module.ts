import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { InicioComponent } from './inicio/inicio.component';
import { MenuTopoComponent } from './menu-topo/menu-topo.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login/login.service';
import { AuthService } from './auth/auth.service';
// import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { BemVindoComponent } from './bem-vindo/bem-vindo.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ComponentsModule } from "./components/components.module";
import { BemVindoLayoutModule } from "./bem-vindo/bem-vindo.module";
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    MenuTopoComponent,
    // MenuLateralComponent,
    BemVindoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ComponentsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule,
    BemVindoLayoutModule,
    FullCalendarModule
  ],
  exports: [MatButtonModule, MatCheckboxModule],
  providers: [
    LoginService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

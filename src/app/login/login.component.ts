import { MenuTopoComponent } from './../menu-topo/menu-topo.component';
// import { MenuLateralComponent } from './../menu-lateral/menu-lateral.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  logaForm: FormGroup;
  senha: string;
  autenticado: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private serviceLogin: LoginService,
    private router: Router) {
    MenuTopoComponent.prototype.menuTopo(false);
    // MenuLateralComponent.prototype.mostraMenu(false);
    this.create();
  }

  create() {
    this.logaForm = this.formBuilder.group({
      nomeUsuario: ['', Validators.required],
      senhaUsuario: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  verificaUsuario(usuario, senha) {
    this.serviceLogin.verificaUsuario(usuario, senha).subscribe((data: any) => {
      console.log('data', data);
      if (data.status.code === 200) {
        console.log('foi 200');
        this.router.navigate(['bem-vindo']);
      } else {
        alert();
      }
    });
  }

  limparCampos(){
    this.logaForm = this.formBuilder.group({
      nomeUsuario: '',
      senhaUsuario: ''
    });
  }

}

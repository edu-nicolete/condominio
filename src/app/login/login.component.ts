import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  logaForm: FormGroup;
  senha: String = '';

  constructor(   private formBuilder: FormBuilder ) { }

  ngOnInit(): void {

    this.logaForm = this.formBuilder.group({
      nomeUsuario:['', Validators.required],
      senhaUsuario:['', Validators.required]
    });
  }

  loga(usuario, senha){

  }

  limpaCampos(){
    this.senha = '';
  }

}

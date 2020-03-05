import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  apresentaMenuLateral: boolean;

  constructor() { }

  ngOnInit() {
  }

  mostraMenu(condicao){
    this.apresentaMenuLateral = condicao;
  }

}

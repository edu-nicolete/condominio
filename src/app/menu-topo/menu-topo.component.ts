import { Component, OnInit, Output } from '@angular/core';
import { MenuLateralComponent } from './../menu-lateral/menu-lateral.component';
import { Router } from '@angular/router';
import { LoginService } from './../login/login.service';

@Component({
  selector: 'app-menu-topo',
  templateUrl: './menu-topo.component.html',
  styleUrls: ['./menu-topo.component.css']
})
export class MenuTopoComponent implements OnInit {

  apresentaMenuTopo: boolean;
  mostraMenu: boolean;

  constructor(
    private serviceLogin: LoginService,
     private router: Router) {
  }

  menuTopo(condicao) {
    MenuLateralComponent.prototype.mostraMenu(false);
    this.apresentaMenuTopo = condicao;
  }

  ngOnInit() {
  }

  logoff(){
    this.serviceLogin.logoutAplicacao().subscribe((data: any) => {
      console.log('data', data);
      if (data.status) {
        this.router.navigate(['']);
      } else {
        alert();
      }
    });
  }

}

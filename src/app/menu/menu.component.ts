import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../menu-topo/menu-topo.component.css']
})
export class MenuComponent implements OnInit{

  @Output() clickMenu = new EventEmitter<string>();
  @Input() value: string = '';
  debounce: Subject<string> = new Subject<string>();


  ngOnInit(){
  }
}

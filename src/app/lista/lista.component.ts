import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {
  @Input() items=[];
  constructor(){
    console.log("lista", this.items);
    
  }
  ngOnInit(){
    console.log('termino de iniciar');
    console.log("ahora si tiene elementos", this.items);
  }
}

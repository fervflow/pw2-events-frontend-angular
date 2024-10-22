import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaComponent, FormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ejemplo1';
  nombre:string = '';
  ci:string = '';
  listaDatos:any = [
    {nombre:'daniel', ci:11231},
    {nombre:'ivana', ci:88888},
  ];
  public onClickAgregar(){
    //alert(this.nombre+' - '+this.ci);
    this.listaDatos.push({
        nombre:this.nombre,
        ci:this.ci
    });
  }
}

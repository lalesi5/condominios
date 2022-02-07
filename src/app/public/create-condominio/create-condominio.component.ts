import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { CondominioService } from '../../services/condominios.service';

@Component({
  selector: 'app-create-condominio',
  templateUrl: './create-condominio.component.html',
  styleUrls: ['./create-condominio.component.css']
})
export class CreateCondominioComponent implements OnInit {

  /*Variables*/

  administrador: any[] = [];
  idAministrador: string = '';


  /*Formularios*/

  condominioForm = new FormGroup({
    nombreCondominio: new FormControl,
    ciudadCondominio: new FormControl,
    descripcionCondominio: new FormControl
  })

  /*Variables de retorno*/

  NavigationExtras: NavigationExtras = {
    state: {

    }
  }

  constructor(
    private router: Router,
    private _condominioService: CondominioService
) {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.administrador = navigations;
    this.idAministrador = navigations.uid;
    console.log('Dato obtenido en /createCondominio', navigations);
}

  ngOnInit(): void {
  }

  onGoBackToList(){
    this.NavigationExtras.state = this.administrador;
    this.router.navigate(['/selectCondominio'], this.NavigationExtras);
  }

  onCreate(){
    console.log(this.condominioForm.value, 'idAdmin: ', this.idAministrador);
    this._condominioService.saveCondominios(this.condominioForm.value, this.idAministrador);
  }

}

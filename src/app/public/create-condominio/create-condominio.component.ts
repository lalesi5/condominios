import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {CondominioService} from '../../services/condominios.service';
import {Subscription} from "rxjs";

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

  condominioForm: FormGroup = new FormGroup({
    nombreCondominio: new FormControl,
    ciudadCondominio: new FormControl,
    descripcionCondominio: new FormControl
  });

  /*Variables de retorno*/

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _condominioService: CondominioService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.administrador = navigations;
    this.idAministrador = navigations.idAdministrador;
    this.NavigationExtras.state = this.administrador;
  }

  onGoBackToList() {
    this.router.navigate(['/selectCondominio'], this.NavigationExtras);
  }

  onCreate() {
    let result = confirm("Esta seguro de agregar el condominio")
    if (result) {
      this._condominioService.saveCondominios(this.condominioForm.value, this.idAministrador);
      alert('El condominio se ha agregado satisfactoriamente');
    }
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/createCondominio'], this.NavigationExtras);
  }

}

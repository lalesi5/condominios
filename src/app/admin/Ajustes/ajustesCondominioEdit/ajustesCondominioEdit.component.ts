import {Component, OnDestroy, OnInit} from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";
import {FormControl, FormGroup} from '@angular/forms';
import {CondominioService} from '../../../services/condominios.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-ajustesCondominioEdit',
  templateUrl: './ajustesCondominioEdit.component.html',
  styleUrls: ['./ajustesCondominioEdit.component.css']
})

export class AjustesCondominioEditComponent implements OnInit, OnDestroy {

  /*Variables*/

  private subscription: Subscription = new Subscription;
  condominio: any[] = [];
  impCondominio: any[] = [];

  idAdministrador: string = '';
  idCondominio: string = '';
  nombreCondominio: string = '';
  ciudadCondominio: string = '';
  descripcionCondominio: string = '';

  /*Formularios*/

  condominioForm = new FormGroup({
    nombreCondominio: new FormControl,
    ciudadCondominio: new FormControl,
    descripcionCondominio: new FormControl
  })

  /*Variables de retorno*/

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _condominiosService: CondominioService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
  this.onListCondminios();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.condominio = navigations;
    this.idCondominio = navigations.idCondominio;
    this.NavigationExtras.state = this.condominio
  }

  onListCondminios() {
    try {
      this.subscription.add(
        this._condominiosService
          .getCondominiosID(this.idCondominio)
          .subscribe(data => {
            data.forEach((element: any) => {
              this.impCondominio.push({
                ...element.payload.doc.data()
              })
            })
          })
      );
    } catch (err) {
      console.log(err);
    }
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesCondominio'], this.NavigationExtras);
  }

  onSaveCondominio() {

    this.impCondominio.forEach((element:any) => {
      this.idAdministrador = element.idAdministrador;
    })

    let result = confirm("Esta seguro de modificar la información")
    if(result){
      this._condominiosService.updateCondominios(this.condominioForm.value,
        this.idAdministrador,
        this.idCondominio);
      alert('Condominio actualizado correctamente');
    }
    this.router.navigate(['/admin'], this.NavigationExtras);
  }
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CondominioService } from '../../../services/condominios.service';
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "src/app/services/dialog.service";

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
  loading = false;

  /*Formularios*/
  condominioForm: FormGroup;

  /*Variables de retorno*/

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _condominiosService: CondominioService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {

    this.condominioForm = this.fb.group({
      nombreCondominio: ['', Validators.required],
      ciudadCondominio: ['', Validators.required],
      descripcionCondominio: [''],
    });

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

    const nombre = String(this.condominioForm.value.nombreCondominio).charAt(0).toLocaleUpperCase() + String(this.condominioForm.value.nombreCondominio).slice(1);
    const ciudad = String(this.condominioForm.value.ciudadCondominio).charAt(0).toLocaleUpperCase() + String(this.condominioForm.value.ciudadCondominio).slice(1);

    const condominio: any = {
      nombreCondominio: nombre,
      ciudadCondominio: ciudad,
      descripcionCondominio: this.condominioForm.value.descripcionCondominio,
    }

    //this.subscription.add(
      this._dialogService.confirmDialog({
        title: 'Modificar información de condominio',
        message: '¿Está seguro de modificar la información del condominio?',
        confirmText: 'Si',
        cancelText: 'No',
      }).subscribe(res => {
        if (res) {
          this.loading = true;
          this._condominiosService.updateCondominios(this.idCondominio, condominio).then(() => {
            this.loading = false;
            this.toastr.success('La información del condominio fue modificada con exito', 'Condominio modificado', {
              positionClass: 'toast-bottom-right'
            });
          })
          this.loading = false;
         this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin'], this.NavigationExtras);
        }
      })
    //)
  }
}
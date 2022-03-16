import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
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

export class AjustesCondominioEditComponent implements OnInit {

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
  id: string | null;

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
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {

    this.condominioForm = this.fb.group({
      nombreCondominio: ['', Validators.required],
      ciudadCondominio: ['', Validators.required],
      descripcionCondominio: [''],
    });

    this.id = aRoute.snapshot.paramMap.get('id');

    this.recoverData();
  }

  ngOnInit(): void {
    this.onListCondminios();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.condominio = navigations;
    this.idCondominio = navigations.idCondominio;
    this.NavigationExtras.state = this.condominio
  }

  onListCondminios() {
    if (this.id !== null) {
      this.loading = true;
      this.subscription.add(
        this._condominiosService.getCondominio(this.id).subscribe(data => {
          this.loading = false;          
          this.condominioForm.setValue({
            nombreCondominio: data.payload.data()['nombreCondominio'],
            ciudadCondominio: data.payload.data()['ciudadCondominio'],
            descripcionCondominio: data.payload.data()['descripcionCondominio'],
          })
        })
      )
    }
  }

  onSaveCondominio() {

    const nombre = String(this.condominioForm.value.nombreCondominio).charAt(0).toLocaleUpperCase() + String(this.condominioForm.value.nombreCondominio).slice(1);
    const ciudad = String(this.condominioForm.value.ciudadCondominio).charAt(0).toLocaleUpperCase() + String(this.condominioForm.value.ciudadCondominio).slice(1);
    const idCondo = this.aRoute.snapshot.paramMap.get('id');
    
    const condominio: any = {
      nombreCondominio: nombre,
      ciudadCondominio: ciudad,
      descripcionCondominio: this.condominioForm.value.descripcionCondominio,
    }

    this._dialogService.confirmDialog({
      title: 'Modificar información de condominio',
      message: '¿Está seguro de modificar la información del condominio?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this.loading = true;
        this._condominiosService.updateCondominios(idCondo!, condominio).then(() => {
          this.loading = false;
          this.toastr.success('La información del condominio fue modificada con exito', 'Condominio modificado', {
            positionClass: 'toast-bottom-right'
          });
        })
        this.loading = false;
        this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin/ajustes/ajustesCondominio'], this.NavigationExtras);
      }
    })
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesCondominio'], this.NavigationExtras);
  }
}
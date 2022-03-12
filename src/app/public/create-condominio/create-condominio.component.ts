import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CondominioService } from '../../services/condominios.service';
import { Subscription } from "rxjs";
import { DialogService } from 'src/app/services/dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-condominio',
  templateUrl: './create-condominio.component.html',
  styleUrls: ['./create-condominio.component.css']
})
export class CreateCondominioComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  /*Variables*/
  administrador: any[] = [];
  idAministrador: string = '';

  /*Formularios*/

  condominioForm = this.fb.group({
    nombreCondominio: ['', Validators.required],
    ciudadCondominio: ['', Validators.required],
    descripcionCondominio: [''],
  })

  /*Variables de retorno*/

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _condominioService: CondominioService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {

    this.recoverData();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

    this._dialogService.confirmDialog({
      title: 'Agregar Condominio',
      message: '¿Está seguro de agregar el condominio?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        const nombreCondominio = String(this.condominioForm.value.nombreCondominio).charAt(0).toLocaleUpperCase() + String(this.condominioForm.value.nombreCondominio).slice(1);
        const ciudadCondominio = String(this.condominioForm.value.ciudadCondominio).charAt(0).toLocaleUpperCase() + String(this.condominioForm.value.ciudadCondominio).slice(1);
        const descripcionCondominio = this.condominioForm.value.descripcionCondominio;
        const data = { nombreCondominio, ciudadCondominio, descripcionCondominio }

        this._condominioService.saveCondominios(data, this.idAministrador);

        this.toastr.success('El condominio se ha creado exitosamente', 'Registro exitoso', {
          positionClass: 'toast-bottom-right', timeOut: 10000
        });
      }
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/createCondominio'], this.NavigationExtras);
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.condominioForm.controls;
  }

  get nombreCondominio() {
    return this.condominioForm.get('nombreCondominio');
  }

  get ciudadCondominio() {
    return this.condominioForm.get('ciudadCondominio');
  }
}
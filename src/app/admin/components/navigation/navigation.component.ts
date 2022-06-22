import {Component, OnInit} from "@angular/core";
import {NavigationExtras, Router} from '@angular/router';
import {Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {DialogService} from "../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {CondominioService} from "../../../services/condominios.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  idCondominio: string = '';
  condominio: any[] = [];

  private subscription: Subscription = new Subscription;

  constructor(
    private _authService: AuthService,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private router: Router,
    private _condominioService: CondominioService
  ) {
    this.recoverData();
  }

  ngOnInit() {
    this.getCondominio();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getCondominio() {
    this.subscription.add(
      this._condominioService.getCondominiosID(this.idCondominio).subscribe(data => {
        this.condominio = [];
        data.forEach((element: any) => {
          this.condominio.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onGoInicio() {
    this.router.navigate(['/admin/inicio']);
  }

  onGoAdministracion() {
    this.router.navigate(['/admin/administracion']);
  }

  onGoComunicacion() {
    this.router.navigate(['/admin/comunicacion']);
  }

  onGoReportes() {
    this.router.navigate(['/admin/reportes']);
  }

  onGoFinanzas() {
    this.router.navigate(['/admin/finanzas']);
  }

  onGoAjustes() {
    this.router.navigate(['/admin/ajustes']);
  }
  onLeave(): void {
    this.router.navigate(['/selectCondominio'])
  }

  onLogout() {
    this.subscription.add(
      this._dialogService.confirmDialog({
        title: 'Cerrar Sesión',
        message: '¿Está seguro de salir del Sistema?',
        confirmText: 'Si',
        cancelText: 'No',
      }).subscribe(res => {
        if (res) {
          this._authService.logout();
          this.toastr.info('Gracias por usar el sistema', 'Ha cerrado Sesión', {
            positionClass: 'toast-bottom-right'
          });
        }
      })
    )
  }
}

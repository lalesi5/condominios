import {Component, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "../../../../services/auth.service";
import {DialogService} from "../../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AdminService} from "../../../../services/admin.service";

@Component({
  selector: 'app-headerInside',
  templateUrl: './headerInside.component.html',
  styleUrls: ['./headerInside.component.css']
})

export class HeaderInsideComponent implements OnInit, OnDestroy {
  idAministrador: string = '';
  administrador: any[] = [];

  private subscription: Subscription = new Subscription;

  constructor(
    private _authService: AuthService,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private router: Router,
    private _adminService: AdminService
  ) {
    this.recoverData();
  }

  ngOnInit() {
    this.getAdministrador();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idAministrador = <string>sessionStorage.getItem('idAdministrador');
  }

  getAdministrador() {
    this.subscription.add(
      this._adminService.getAdministradorID(this.idAministrador).subscribe(data => {
        this.administrador = [];
        data.forEach((element: any) => {
          this.administrador.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
      })
    );
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

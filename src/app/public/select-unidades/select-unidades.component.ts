import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {UnidadesService} from "../../services/unidades.service";
import {DialogService} from "../../services/dialog.service";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-select-unidades',
  templateUrl: './select-unidades.component.html',
  styleUrls: ['./select-unidades.component.css']
})
export class SelectUnidadesComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idUsuario: string = '';
  unidades: any[] = [];

  constructor(
    private router: Router,
    private _unidadService: UnidadesService,
    private _authService: AuthService,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.onListUnidades();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idUsuario = <string>sessionStorage.getItem('idUsuario');
  }

  onListUnidades() {
    try {
      this.subscription.add(
        this._unidadService
          .getAllUnidadesIdUser(this.idUsuario)
          .subscribe(data => {
            this.unidades = [];
            data.forEach((element: any) => {
              this.unidades.push({
                id: element.payload.doc.id,
                ...element.payload.doc.data()
              })
            })
          })
      )
    } catch (err) {
      console.log(err);
    }
  }

  onGoAdmin(item: any) {
    sessionStorage.setItem('idAdministrador', <string>item.idAdministrador);
    sessionStorage.setItem('idCondominio', <string>item.idCondominio);
    sessionStorage.setItem('idUsuario', <string>item.idUsuario);
    sessionStorage.setItem('idUnidad', <string>item.idUnidad);
    sessionStorage.setItem('nombreResidente', <string>item.nombreResidente);
    sessionStorage.setItem('apellidoResidente', <string>item.apellidoResidente);
    sessionStorage.setItem('unidad', <string>item.unidad);
    this.router.navigate(['/user']);
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

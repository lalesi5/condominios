import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";
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
  usuario: any[] = [];
  idUsuario: string = '';
  unidades: any[] = [];
  idUnidad: string = '';

  NavigationExtras: NavigationExtras = {
    state: {}
  }

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
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idUsuario = navigations.idUsuario;
    this.usuario = navigations;
    this.NavigationExtras.state = this.usuario;
  }

  onListUnidades(){
    try {
      this.subscription.add(
        this._unidadService
          .getAllUnidadesIdUser(this.idUsuario)
          .subscribe(data => {
            data.forEach((element: any) => {
              this.unidades.push({
                ...element.payload.doc.data()
              })
            })
          })
      );
    } catch (err) {
      console.log(err);
    }
  }

  onGoAdmin(item: any) {
    this.NavigationExtras.state = item;
    this.router.navigate(['/user'], this.NavigationExtras);
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

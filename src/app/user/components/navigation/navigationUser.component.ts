import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {DialogService} from "../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";
import {UnidadesService} from "../../../services/unidades.service";

@Component({
  selector: 'app-navigationUser',
  templateUrl: './navigationUser.component.html',
  styleUrls: ['./navigationUser.component.css']
})

export class NavigationUserComponent implements OnInit {

  idUnidad: string = '';
  nombreUnidad: string = '';
  unidad: any[] = [];

  private subscription: Subscription = new Subscription;

  constructor(
    private _authService: AuthService,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private router: Router,
    private _unidadService: UnidadesService
  ) {
    this.recoverData();
  }

  ngOnInit() {
    this.getUnidad();
  }

  recoverData() {
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
  }

  getUnidad() {
    this.subscription.add(
      this._unidadService.getUnidadesById(this.idUnidad).subscribe(data => {
        this.unidad = [];
        data.forEach((element: any) => {
          this.nombreUnidad = element.payload.doc.data()['unidad'];
          this.unidad.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onGoInicio() {
    this.router.navigate(['/user/home']);
  }

  onGoComunicacion() {
    this.router.navigate(['/user/comunicacion']);
  }

  onGoAreasComunales() {
    this.router.navigate(['/user/areasComunes']);
  }

  onGoFinanzas() {
    this.router.navigate(['/user/finanzas']);
  }

  onGoAjustes() {
    this.router.navigate(['/user/ajustes']);
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

  onLeave(): void {
    this.router.navigate(['/selectUnidad'])
  }
}

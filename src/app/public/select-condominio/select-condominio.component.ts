import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CondominioService} from '../../services/condominios.service';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {DialogService} from 'src/app/services/dialog.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-select-condominio',
  templateUrl: './select-condominio.component.html',
  styleUrls: ['./select-condominio.component.css']
})
export class SelectCondominioComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  condominios: any[] = [];

  constructor(
    private router: Router,
    private _condominiosService: CondominioService,
    private _authService: AuthService,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.onListCondominios();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idAministrador = <string>sessionStorage.getItem('idAdministrador');
  }

  onListCondominios() {
    try {
      this.subscription.add(
        this._condominiosService
          .getCondominios(this.idAministrador)
          .subscribe(data => {
            this.condominios = [];
            data.forEach((element: any) => {
              this.condominios.push({
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
    sessionStorage.setItem('idCondominio', <string>item.idCondominio);
    sessionStorage.setItem('imgCondominio', <string>item.imgCondominio);
    this.router.navigate(['/admin']);
  }

  onGoCreate() {
    this.router.navigate(['/createCondominio']);
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

  onDelete(item: any) {

    this.subscription.add(
      this._dialogService.confirmDialog({
        title: 'Eliminar condominio',
        message: '¿Está seguro de eliminar el Condominio?',
        confirmText: 'Si',
        cancelText: 'No',
      }).subscribe(res => {
        if (res) {
          const idCondominioEliminar = item.idCondominio;
          this._condominiosService.deleteCondominios(idCondominioEliminar);
          /*recargar componente*/
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url]);
          this.toastr.success('El condominio se ha eliminado exitosamente', 'Registro eliminado', {
            positionClass: 'toast-bottom-right'
          });
        }
      })
    )


  }
}

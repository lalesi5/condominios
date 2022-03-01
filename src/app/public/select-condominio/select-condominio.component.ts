import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {CondominioService} from '../../services/condominios.service';
import {AdminService} from '../../services/admin.service';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-select-condominio',
  templateUrl: './select-condominio.component.html',
  styleUrls: ['./select-condominio.component.css']
})
export class SelectCondominioComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  administrador: any[] = [];
  idAministrador: string = '';
  condominios: any[] = [];
  idCondominio: string = '';

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _condominiosService: CondominioService,
    private _adminService: AdminService,
    private _authService: AuthService
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
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.administrador = navigations;
  }

  onListCondominios() {
    try {
      this.subscription.add(
        this._condominiosService
          .getCondominios(this.idAministrador)
          .subscribe(data => {
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
    this.NavigationExtras.state = item;
    this.router.navigate(['/admin'], this.NavigationExtras);
  }

  onGoCreate() {
    this.NavigationExtras.state = this.administrador;
    this.router.navigate(['/createCondominio'], this.NavigationExtras);
  }

  onLogout() {
    let result = confirm("Esta seguro de salir del Sistema!");
    if (result) {
      this._authService.logout();
      alert('Gracias por usar el sistema');
    }
  }

  onDelete(item: any) {

    this.NavigationExtras.state = this.administrador;
    let result = confirm("Esta seguro de eliminar el Condominio!");
    if (result) {
      const idCondominioEliminar = item.idCondominio;
      this._condominiosService
        .deleteCondominios(idCondominioEliminar);

      /*recargar componente*/

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([this.router.url], this.NavigationExtras);
    }
  }

}

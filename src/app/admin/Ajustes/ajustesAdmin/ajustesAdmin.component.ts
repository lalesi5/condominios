import {Component, OnDestroy, OnInit} from "@angular/core";
import {AdminService} from '../../../services/admin.service';
import {Router, NavigationExtras} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-ajustesAdmin',
  templateUrl: './ajustesAdmin.component.html',
  styleUrls: ['./ajustesAdmin.component.css']
})

export class AjustesAdminComponent implements OnInit, OnDestroy {

  /*Variables*/

  private subscription: Subscription = new Subscription;
  administrador: any[] = [];
  idAministrador: string = '';
  condominio: any[] = [];

  /*Variables de retorno*/

  navigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _adminService: AdminService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.getAdministrador();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  getAdministrador() {
    try {
      this.subscription.add(
        this._adminService
          .getAdministradorID(this.idAministrador)
          .subscribe(data => {
            data.forEach((element: any) => {
              this.administrador.push({
                ...element.payload.doc.data()
              })
            })
          })
      );
    } catch (err) {
      console.log(err);
    }
  }

  onEdit(): void {
    this.router.navigate(['/admin/ajustes/ajustesAdminEdit'], this.navigationExtras);
  }

}

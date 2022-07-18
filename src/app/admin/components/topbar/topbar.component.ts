import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import { AdminService } from "src/app/services/admin.service";
import {CondominioService} from "../../../services/condominios.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})

export class TopBarComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  condominios: any[] = [];
  administrador: any[] = [];

  constructor(
    private _condominiosService: CondominioService,
    private _adminService: AdminService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.onListCondominios();
    this.getAdministrador();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idAministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
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

  onListCondominios() {
    try {
      this.subscription.add(
        this._condominiosService
          .getCondominiosID(this.idCondominio)
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
}

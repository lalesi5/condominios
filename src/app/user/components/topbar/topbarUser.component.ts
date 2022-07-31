import { Component, OnInit } from "@angular/core";
import {Subscription} from "rxjs";
import { AdminService } from "src/app/services/admin.service";
import {CondominioService} from "../../../services/condominios.service";

@Component({
    selector: 'app-topbarUser',
    templateUrl: './topbarUser.component.html',
    styleUrls: ['./topbarUser.component.css']
})

export class TopBarUserComponent implements OnInit{
  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  condominios: any[] = [];
  usuarios: any[] = [];
  idUsuario: string = '';

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
    this.idUsuario = <string>sessionStorage.getItem('idUsuario');
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

  getAdministrador() {
    this.subscription.add(
      this._adminService.getUserID(this.idUsuario).subscribe(data => {
        this.usuarios = [];
        data.forEach((element: any) => {
          this.usuarios.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
      })
    );
  }
}

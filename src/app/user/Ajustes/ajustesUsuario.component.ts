import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: 'app-ajustesUsuario',
  templateUrl: './ajustesUsuario.component.html',
  styleUrls: ['./ajustesUsuario.component.css']
})

export class AjustesUsuarioComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  administrador: any[] = [];
  idUsuario: string = '';

  constructor(
    private router: Router,
    private _adminService: AdminService
  ) {
    this.recoverData()
  }

  ngOnInit() {
    this.getAdministrador();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idUsuario = <string>sessionStorage.getItem('idUsuario');
  }

  getAdministrador() {
    this.subscription.add(
      this._adminService.getUserID(this.idUsuario).subscribe(data => {
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

  onEdit() {
    this.router.navigate(['/user/editarUsuario']);
  }

}

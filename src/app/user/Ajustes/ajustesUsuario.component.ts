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
  unidad: any[] = [];

  navigationExtras: NavigationExtras = {
    state: {}
  }

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
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idUsuario = navigations.idUsuario;
    this.unidad = navigations;
    this.navigationExtras.state = this.unidad;
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

  onEdit(item: any) {
    this.navigationExtras.state = item;
    this.router.navigate(['/user/editarUsuario', item.idUsuario], this.navigationExtras);
  }

}

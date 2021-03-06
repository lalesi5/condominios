import {Component, OnDestroy, OnInit} from "@angular/core";
import {AdminService} from '../../../services/admin.service';
import {Router} from '@angular/router';
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
    this.idAministrador = <string>sessionStorage.getItem('idAdministrador');
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

  onEdit() {
    this.router.navigate(['/admin/ajustes/ajustesAdminEdit']);
  }

}

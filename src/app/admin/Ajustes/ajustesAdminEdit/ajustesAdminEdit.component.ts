import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router, NavigationExtras} from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {FormGroup, FormControl} from '@angular/forms';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-ajustesAdminEdit',
  templateUrl: './ajustesAdminEdit.component.html',
  styleUrls: ['./ajustesAdminEdit.component.css']
})

export class AjustesAdminEditComponent implements OnInit, OnDestroy {

  /*Variables*/

  private subscription: Subscription = new Subscription;
  condominio: any[] = [];
  administrador: any[] = [];

  idAministrador: string = '';
  emailAministrador: string = '';
  passwordAministrador: string = '';
  rolAministrador: string = '';

  /*Formularios*/

  administradorForm = new FormGroup({
    name: new FormControl,
    last_name: new FormControl,
    address: new FormControl,
    phone: new FormControl
  })

  /*Variables de retorno*/

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _adminService: AdminService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.onListAdmin();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.condominio = navigations;
    this.idAministrador = navigations.idAdministrador;
    this.NavigationExtras.state = this.condominio;
  }

  onListAdmin() {
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

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes'], this.NavigationExtras);
  }

  onCreateAdmin() {

    this.administrador.forEach((element: any) => {
      this.idAministrador = element.idAdministrador;
      this.emailAministrador = element.email;
      this.passwordAministrador = element.password;
      this.rolAministrador = element.rol;
    })

    let result = confirm("Esta seguro de modificar la información")
    if (result) {
      this._adminService.saveAdministrador(this.administradorForm.value,
        this.idAministrador,
        this.emailAministrador,
        this.passwordAministrador,
        this.rolAministrador);
      alert('Administrador actualizado correctamente');
    }
    this.router.navigate(['/admin'], this.NavigationExtras);
  }
}

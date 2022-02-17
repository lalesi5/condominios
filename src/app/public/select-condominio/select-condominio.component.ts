import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CondominioService } from '../../services/condominios.service';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-select-condominio',
  templateUrl: './select-condominio.component.html',
  styleUrls: ['./select-condominio.component.css']
})
export class SelectCondominioComponent implements OnInit {

  administrador: any[] = [];
  idAministrador: string = '';
  condominios: any[] = [];
  idCondominio: string = '';

  NavigationExtras: NavigationExtras = {
    state: {

    }
  }

  constructor(
    private router: Router,
    private _condominiosService: CondominioService,
    private _adminService: AdminService,
    private _authService: AuthService
  ) {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.administrador = navigations;
    this.idAministrador = navigations.uid || navigations.idAdministrador;
    
  }

  ngOnInit(): void {
    this.onListCondominios();
    this.getAdministrador();
  }


  onListCondominios() {
    try {
      this._condominiosService
        .getCondominios(this.idAministrador)
        .subscribe(data => {
          data.forEach((element: any) => {
            this.condominios.push({
              ...element.payload.doc.data()
            })
          })
          this.condominios.forEach((element: any) => {
            this.idCondominio = element.idCondominio
          })
          //console.log(this.condominios);
        })
    }
    catch (err) {
      console.log(err);
    }
  }


  getAdministrador() {
    try {
      this._adminService
        .getAdministradorID(this.idAministrador)
        .subscribe(data => {
          data.forEach((element: any) => {
            this.administrador = element.payload.doc.data();
          })
        })
    }
    catch (err) {
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

  onLogout(){
    this._authService.logout();
    alert('Gracias por usar el sistema');
  }

  onDelete(item: any){
    const idCondominioEliminar = item.idCondominio;
    this._condominiosService
    .deleteCondominios(idCondominioEliminar);
  }

}

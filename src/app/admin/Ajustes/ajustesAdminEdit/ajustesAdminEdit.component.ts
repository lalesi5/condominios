import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-ajustesAdminEdit',
    templateUrl: './ajustesAdminEdit.component.html',
    styleUrls: ['./ajustesAdminEdit.component.css']
})

export class AjustesAdminEditComponent implements OnInit {

    /*Variables de Retorno */

    condominio: any[] = [];
    idAministrador: string = '';
    emailAministrador: string = '';
    passwordAministrador: string = '';
    rolAministrador: string = '';
    administrador: any[] = [];

    /*Formularios*/

    administradorForm = new FormGroup({
        name: new FormControl,
        last_name: new FormControl,
        address: new FormControl,
        phone: new FormControl
    })

    /*Variables de retorno*/

    NavigationExtras: NavigationExtras = {
        state: {

        }
    }

    constructor(
        private router: Router,
        private _adminService: AdminService
    ) {
        const navigations: any = this.router.getCurrentNavigation()?.extras.state;
        this.condominio = navigations;
        this.idAministrador = navigations.idAdministrador;
    }
    ngOnInit(): void {
        this.onListAdmin();
    }

    onListAdmin() {
        try {
            this._adminService
                .getAdministradorID(this.idAministrador)
                .subscribe(data => {
                    data.forEach((element: any) => {
                        this.administrador.push({
                            ...element.payload.doc.data()
                        })
                    })
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    onBacktoList(): void {
        this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin/ajustes'], this.NavigationExtras);
    }

    onCreateAdmin() {

        this.administrador.forEach((element: any) => {
            this.idAministrador = element.uid;
            this.emailAministrador = element.email;
            this.passwordAministrador = element.password;
            this.rolAministrador = element.rol;
        })

        //console.log(this.administradorForm.value, 'idAdmin', this.emailAministrador);
        this._adminService.saveAdministrador(this.administradorForm.value,
            this.idAministrador,
            this.emailAministrador,
            this.passwordAministrador,
            this.rolAministrador);
        alert('Administrador actualizado correctamente');
    }
}
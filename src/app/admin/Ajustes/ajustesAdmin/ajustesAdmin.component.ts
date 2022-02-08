import { Component, OnInit } from "@angular/core";
import { AdminService } from '../../../services/admin.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-ajustesAdmin',
    templateUrl: './ajustesAdmin.component.html',
    styleUrls: ['./ajustesAdmin.component.css']
})

export class AjustesAdminComponent implements OnInit {

    administrador: any[] = [];
    idAministrador: string = '';
    condominio: any[] = [];

    navigationExtras: NavigationExtras = {
        state: {

        }
    }

    constructor(
        private router: Router,
        private _adminService: AdminService
    ) {
        const navigations: any = this.router.getCurrentNavigation()?.extras.state;
        this.idAministrador = navigations.idAdministrador;
        this.condominio = navigations;
        //console.log('Dato obtenido en /ajustes', navigations);
    }

    ngOnInit(): void {
        this.getAdministrador();
    }

    getAdministrador() {
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

    onEdit(): void {
        this.navigationExtras.state = this.condominio;
        this.router.navigate(['/admin/ajustes/ajustesAdminEdit'], this.navigationExtras);
    }

}
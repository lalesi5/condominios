import { Component, OnInit } from "@angular/core";
import { AdminService } from '../../../services/admin.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-ajustesAdmin',
    templateUrl: './ajustesAdmin.component.html',
    styleUrls: ['./ajustesAdmin.component.css']
})

export class AjustesAdminComponent implements OnInit {

    admins: any[] = [];
    idAdmin: string = '';
    condominios: any[] = [];
    idCondominio: string = ';'
    areasComunales: any[] = [];

    navigationExtras: NavigationExtras ={
        state:{

        }
    }

    constructor(
        private router: Router,
        private _adminService: AdminService
    ) { }

    ngOnInit(): void {
        this.getAdministrador();
    }

    async getAdministrador() {
        try{
            this._adminService
            .getAdministrador()
            .subscribe(data => {
                data.forEach((element: any) => {
                    this.admins.push({
                        id: element.payload.doc.id,
                        ...element.payload.doc.data()
                    })
                    this.idAdmin = element.payload.doc.id;
                })
            })
        }
                catch (err){
            console.log(err);
        }
    }

    onEdit(): void {
        this.navigationExtras.state = this.admins; 
        this.router.navigate(['/admin/ajustes/ajustesAdminEdit'], this.navigationExtras);
    }

}
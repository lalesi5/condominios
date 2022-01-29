import { Component, OnInit } from "@angular/core";
import { AdminService } from '../../../services/admin.service';

@Component({
    selector: 'app-ajustesAdmin',
    templateUrl: './ajustesAdmin.component.html',
    styleUrls: ['./ajustesAdmin.component.css']
})

export class AjustesAdminComponent implements OnInit {

    admins: any[] = [];
    condominios: any[] = [];

    constructor(
        private _adminService: AdminService
    ) { }

    ngOnInit(): void {
        this.getAdministrador();
        this.getCondominios();
    }

    getAdministrador() {
        this._adminService
            .getAdministrador()
            .subscribe(data => {
                data.forEach((element: any) => {
                    this.admins.push({
                        id: element.payload.doc.id,
                        ...element.payload.doc.data()
                    })
                })
                console.log(this.admins);
            })
    }

    getCondominios() {
        this._adminService
            .getCondominiosAdministrador()
            .subscribe(data => {
                data.forEach((element: any) => {
                    this.condominios.push({
                        id: element.payload.doc.id,
                        ...element.payload.doc.data()
                    })
                })
                console.log(this.condominios);
            })
    }


}
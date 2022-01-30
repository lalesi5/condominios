import { Component, OnInit } from "@angular/core";
import { AdminService } from '../../../services/admin.service';

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

    constructor(
        private _adminService: AdminService
    ) { }

    ngOnInit(): void {
        this.getAdministrador();
        //this.getAreasComunales();
    }

    async getAdministrador() {
      await  this._adminService
            .getAdministrador()
            .subscribe(data => {
                data.forEach((element: any) => {
                    this.admins.push({
                        id: element.payload.doc.id,
                        ...element.payload.doc.data()
                    })
                    this.idAdmin = element.payload.doc.id;
                })
                console.log(this.admins);
                this.getCondominios(this.idAdmin);
            })
    }

    getCondominios(idAdministrador: string) {
        this._adminService
            .getCondominiosAdministrador(idAdministrador)
            .subscribe(data => {
                data.forEach((element: any) => {
                    this.condominios.push({
                        id: element.payload.doc.id,
                        ...element.payload.doc.data()
                    })
                    this.idCondominio = element.payload.doc.id;
                })
                console.log(this.condominios);
                this.getAreasComunales(idAdministrador,this.idCondominio);
            })
    }

    getAreasComunales(idAdministrado:string, idCondominio: string) {
        this._adminService
            .getAreasComunalesCondominio(idAdministrado, idCondominio)
            .subscribe(data => {
                data.forEach((element: any) => {
                    this.areasComunales.push({
                        id: element.payload.doc.id,
                        ...element.payload.doc.data()
                    })
                })
                console.log(this.areasComunales);
            })
    }


}
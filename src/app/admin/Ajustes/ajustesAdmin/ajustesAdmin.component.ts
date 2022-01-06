import { Component, OnInit } from "@angular/core";
import { AdminService } from '../../../services/admin.service';

@Component({
    selector: 'app-ajustesAdmin',
    templateUrl: './ajustesAdmin.component.html',
    styleUrls: ['./ajustesAdmin.component.css']
})

export class AjustesAdminComponent implements OnInit{
    admins: any[] = [];

    constructor( private _adminService: AdminService ){}
    
    ngOnInit(){

        this.getAdmin();
        
    }

    getAdmin(){
        this._adminService
        .getAdmin()
        .subscribe(data => {
            data.forEach((element: any) => {
                this.admins.push({
                    id: element.payload.doc.id,
                    ...element.payload.doc.data()
                })
            });
        })
    }
}
import { Component, OnInit } from "@angular/core";  
import { AdminService } from '../../../services/admin.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-ajustesAdmin',
    templateUrl: './ajustesAdmin.component.html',
    styleUrls: ['./ajustesAdmin.component.css']
})

export class AjustesAdminComponent implements OnInit{

    idLoggedAdmin: string = 'aJ3KYBIqvRhQ8Q0LsYKAX59vpuG2';
    admins: any[] = [];

    NavigationExtras: NavigationExtras = {
        state: {
            value: null
        } 
    }

    constructor(
        private _adminService: AdminService,
        private router: Router
        ){
        }
    
    ngOnInit(): void {
        this.getAdminLogged();
    }

    getAdminLogged(){
        this._adminService
            .getAdmin(this.idLoggedAdmin)
            .subscribe(data => {
                data.forEach((element: any) => {
                    this.admins.push(element);
                });
                this.NavigationExtras.state = this.admins;
            })
    }

    onEdit(): void{
        this.router.navigate(['/admin/ajustes/ajustesAdminEdit'], this.NavigationExtras );
    }


}
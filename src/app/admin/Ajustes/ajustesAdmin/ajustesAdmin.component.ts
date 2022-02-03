import { Component, OnInit } from "@angular/core";
import { AdminService } from '../../../services/admin.service';
import { NavigationExtras, Router } from '@angular/router';
import { Administrador } from '../../../models/administrador.interface';

@Component({
    selector: 'app-ajustesAdmin',
    templateUrl: './ajustesAdmin.component.html',
    styleUrls: ['./ajustesAdmin.component.css']
})

export class AjustesAdminComponent implements OnInit {

    administradores$ = this._adminService.administradores;

    navigationExtras: NavigationExtras = {
      state: {
        value: null
      }
    };
  
    constructor(
        private router: Router,
        private _adminService: AdminService
    ) { 
        const navigation = this.router.getCurrentNavigation();
    }

    ngOnInit(): void {
        
    }

    onGoEdit(item: any): void {
        this.navigationExtras.state = item;
        this.router.navigate(['/admin/ajustes/ajustesAdminEdit'], this.navigationExtras);
    }

}
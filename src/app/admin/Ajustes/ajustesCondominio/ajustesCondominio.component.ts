import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
    selector: 'app-ajustesCondominio',
    templateUrl: './ajustesCondominio.component.html',
    styleUrls: ['./ajustesCondominio.component.css']
})

export class AjustesCondominioComponent implements OnInit {

    admins: any[] = [];
    idAdmin: string = '';
    condominios: any[] = [];
    idCondominio: string = ';'
    areasComunales: any[] = [];

    createFormGroup() {
        return new FormGroup({
            nombre: new FormControl(''),
            ciudad: new FormControl(''),
            Propietario: new FormControl(''),
            idAdministrador: new FormControl(''),
        });
    }

    contactForm: FormGroup;

    constructor(
        private router: Router,
        private _adminService: AdminService
    ) {
        this.contactForm = this.createFormGroup();
    }

    ngOnInit() { 
        
    }

    onEdit(): void{
        this.router.navigate(['/admin/ajustes/ajustesCondominioEdit']);
    }
}
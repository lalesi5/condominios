import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NavigationExtras, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { CondominioService } from '../../../services/condominios.service';

@Component({
    selector: 'app-ajustesCondominio',
    templateUrl: './ajustesCondominio.component.html',
    styleUrls: ['./ajustesCondominio.component.css']
})

export class AjustesCondominioComponent implements OnInit {

    admins: any[] = [];
    condominios: any[] = [];

    idAdministrador: string = '';
    idCondominio: string = '';
    nombreCondominio: string = '';
    ciudadCondominio: string = '';
    descripcionCondominio: string = '';

    /*Variables de retorno*/

    NavigationExtras: NavigationExtras = {
        state: {

        }
    }

    constructor(
        private router: Router,
        private _condominioService: CondominioService
    ) {
        const navigations: any = this.router.getCurrentNavigation()?.extras.state;
        this.condominios = navigations;
        
        this.idAdministrador = navigations.idAdministrador;
        this.idCondominio = navigations.idCondominio;
        this.nombreCondominio = navigations.nombreCondominio;
        this.ciudadCondominio = navigations.ciudadCondominio;
        this.descripcionCondominio = navigations.descripcionCondominio;
    }

    ngOnInit() { 
    }

    onEdit(): void{
        this.NavigationExtras.state = this.condominios;
        this.router.navigate(['/admin/ajustes/ajustesCondominioEdit'], this.NavigationExtras);
    }
}
import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { FormControl, FormGroup } from '@angular/forms';
import { CondominioService } from '../../../services/condominios.service';

@Component({
    selector: 'app-ajustesCondominioEdit',
    templateUrl: './ajustesCondominioEdit.component.html',
    styleUrls: ['./ajustesCondominioEdit.component.css']
})

export class AjustesCondominioEditComponent implements OnInit {

    /*Variables*/
    
    condominios: any[] = [];

    idAdministrador: string = '';
    idCondominio: string = '';
    nombreCondominio: string = '';
    ciudadCondominio: string = '';
    descripcionCondominio: string = '';

    /*Formularios*/

    condominioForm = new FormGroup({
        nombreCondominio: new FormControl,
        ciudadCondominio: new FormControl,
        descripcionCondominio: new FormControl
    })

    /*Variables de retorno*/

    NavigationExtras: NavigationExtras = {
        state: {

        }
    }

    constructor(
        private router: Router,
        private _condominiosService: CondominioService
    ) {
        const navigations: any = this.router.getCurrentNavigation()?.extras.state;
        this.condominios = navigations;
        this.idAdministrador = navigations.idAdministrador;
        this.idCondominio = navigations.idCondominio;
        this.nombreCondominio = navigations.nombreCondominio;
        this.ciudadCondominio = navigations.ciudadCondominio;
        this.descripcionCondominio = navigations.descripcionCondominio;
    }

    ngOnInit(): void {

    }

    onBacktoList(): void {
        this.NavigationExtras.state = this.condominios;
        this.router.navigate(['/admin/ajustes/ajustesCondominio'], this.NavigationExtras);
    }
    
    onSaveCondominio(){
        this.NavigationExtras.state = this.condominios;
        this._condominiosService.saveCondominios(this.condominioForm.value, this.idAdministrador,this.idCondominio)
        alert('Condominio actualizado correctamente');
    }

}

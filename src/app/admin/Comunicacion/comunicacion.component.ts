import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Component({
    selector: 'app-comunicacion',
    templateUrl: './comunicacion.component.html',
    styleUrls: ['./comunicacion.component.css']
})

export class ComunicacionComponent implements OnInit{

    idAministrador: string = '';
    condominio: any[] = [];

    NavigationExtras: NavigationExtras = {
        state: {

        }
    }

    constructor(
        private router: Router,
    ) {
        const navigations: any = this.router.getCurrentNavigation()?.extras.state;
        this.idAministrador = navigations.uid;
        this.condominio = navigations;
    }

    ngOnInit(){}

    onGoAnunciosGenerales(){
        this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin/comunicacion/generales'], this.NavigationExtras);
    }

    onGoComunicadosIndividuales(){
        this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin/comunicacion/individuales'], this.NavigationExtras);
    }

}
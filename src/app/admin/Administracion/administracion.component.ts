import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Component({
    selector: 'app-administracion',
    templateUrl: './administracion.component.html',
    styleUrls: ['./administracion.component.css']
})

export class AdministracionComponent implements OnInit{
    
    
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

    onGoAjustesUnidades(){
        this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin/administracion/unidades'], this.NavigationExtras);
    }

    onGoAjustesUsuarios(){
        this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin/administracion/usuarios'], this.NavigationExtras);
    }

    onGoAjustesAreasComunales(){
        this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin/administracion/areasComunes'], this.NavigationExtras);
    }


}
import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";


@Component({
    selector: 'app-ajustes',
    templateUrl: './ajustes.component.html',
    styleUrls: ['./ajustes.component.css']
})

export class AjustesComponent implements OnInit{

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
    
    ngOnInit(){

    }

    onGoAjustesAdmin(){
        this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin/ajustes/ajustesAdmin'], this.NavigationExtras);
    }

    onGoAjustesCondominio(){
        this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin/ajustes/ajustesCondominio'], this.NavigationExtras);
    }

    onGoAjustesAreasComunales(){
        this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin/ajustes/ajustesAreasComunales'], this.NavigationExtras);
    }

    onGoAjustesajustesUnidades(){
        this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin/ajustes/ajustesUnidades'], this.NavigationExtras);
    }

    onGoAjustesajustesUsuarios(){
        this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin/ajustes/ajustesUsuariosUnidades'], this.NavigationExtras);
    }   

    onGoAjustesUsuarios(){
        this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin/ajustes/ajustesUsuarios'], this.NavigationExtras);
    }
}
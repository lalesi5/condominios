import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit{
    
    idAministrador: string = '';

    NavigationExtras: NavigationExtras = {
        state: {

        }
    }

    constructor(
        private router: Router,
    ) {
        const navigations: any = this.router.getCurrentNavigation()?.extras.state;
        this.idAministrador = navigations;
        //console.log('Dato obtenido en /inicio', this.idAministrador);
    }
    
    ngOnInit(){}
}
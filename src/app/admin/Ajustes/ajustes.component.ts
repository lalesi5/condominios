import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";


@Component({
    selector: 'app-ajustes',
    templateUrl: './ajustes.component.html',
    styleUrls: ['./ajustes.component.css']
})

export class AjustesComponent implements OnInit{

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
        console.log('Dato obtenido en /ajustes', this.idAministrador);
    }
    
    ngOnInit(){

        
    }



}
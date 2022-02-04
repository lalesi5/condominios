import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Component({
    selector: 'app-finanzas',
    templateUrl: './finanzas.component.html',
    styleUrls: ['./finanzas.component.css']
})

export class FinanzasComponent implements OnInit{
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
        console.log('Dato obtenido en /finanzas', this.idAministrador);
    }
    
    ngOnInit(){}
}
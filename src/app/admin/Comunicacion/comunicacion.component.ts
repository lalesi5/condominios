import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Component({
    selector: 'app-comunicacion',
    templateUrl: './comunicacion.component.html',
    styleUrls: ['./comunicacion.component.css']
})

export class ComunicacionComponent implements OnInit{
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
        //console.log('Dato obtenido en /comunicacion', this.idAministrador);
    }
    ngOnInit(){}
}
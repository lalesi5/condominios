import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
})

export class AdminComponent implements OnInit {

    idAministrador: string = '';

    NavigationExtras: NavigationExtras = {
        state: {

        }
    }

    constructor(
        private router: Router
    ) {
        const navigations: any = this.router.getCurrentNavigation()?.extras.state;
        //this.idAministrador = navigations.idAdministrador;
        //console.log('Dato obtenido en /admin', navigations);
    }

    ngOnInit() { 

    }

}

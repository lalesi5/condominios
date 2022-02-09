import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Component({
    selector: 'app-administracion',
    templateUrl: './administracion.component.html',
    styleUrls: ['./administracion.component.css']
})

export class AdministracionComponent implements OnInit{
    
    
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
        //console.log('Dato obtenido en /administracion', this.idAministrador);
    }

    ngOnInit(){}
}
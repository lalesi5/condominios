import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {

    idAministrador: any = '';

    NavigationExtras: NavigationExtras = {
        state: {

        }
    }

    constructor(
        private router: Router,
        private authSvc: AuthService
    ) {
        const navigations: any = this.router.getCurrentNavigation()?.extras.state;
        this.idAministrador = navigations.uid;
        console.log('Dato obtenido en /navigation', this.idAministrador);
    }

    ngOnInit() { }

    onGoInicio(){
        this.NavigationExtras.state = this.idAministrador;
        this.router.navigate(['/admin/inicio'], this.NavigationExtras);
    }

    onGoAdministracion(){
        this.NavigationExtras.state = this.idAministrador;
        this.router.navigate(['/admin/administracion'], this.NavigationExtras);
    }
    
    onGoComunicacion(){
        this.NavigationExtras.state = this.idAministrador;
        this.router.navigate(['/admin/comunicacion'], this.NavigationExtras);
    }

    onGoReportes(){
        this.NavigationExtras.state = this.idAministrador;
        this.router.navigate(['/admin/reportes'], this.NavigationExtras);
    }

    onGoFinanzas(){
        this.NavigationExtras.state = this.idAministrador;
        this.router.navigate(['/admin/finanzas'], this.NavigationExtras);
    }

    onGoAjustes(){
        this.NavigationExtras.state = this.idAministrador;
        this.router.navigate(['/admin/ajustes'], this.NavigationExtras);
    }

    onLogout(): void {
        alert('Gracias por usar el sistema');
        this.authSvc.logout();
        this.router.navigate(['/home'])
    }
}
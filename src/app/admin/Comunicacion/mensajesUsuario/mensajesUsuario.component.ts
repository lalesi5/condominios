import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { MensajesService } from '../../../services/mensajes.service';

@Component({
    selector: 'app-mensajesUsuario',
    templateUrl: './mensajesUsuario.component.html',
    styleUrls: ['./mensajesUsuario.component.css']
})

export class MensajeUsuarioComponent implements OnInit {

    idAministrador: string = '';
    idCondominio: string = '';
    idUnidad: string = '';
    mensajes: any[] = [];
    condominio: any[] = [];

    NavigationExtras: NavigationExtras = {
        state: {

        }
    }

    constructor(
        private router: Router,
        private _mensajesService: MensajesService
    ) {

        const navigations: any = this.router.getCurrentNavigation()?.extras.state;
        this.idAministrador = navigations.idAdministrador;
        this.idCondominio = navigations.idCondominio;
        this.idUnidad = navigations.idUnidad;
        this.condominio = navigations;
    }

    ngOnInit() { 
        this.getMensajes();
    }

    getMensajes() {
        try {
            this._mensajesService
            .getMensajes(this.idUnidad)
            .subscribe(data => {
                data.forEach((element: any) => {
                    this.mensajes.push({
                        ...element.payload.doc.data()
                    })
                })
            })
        }
        catch(err){
            console.log(err);
        }
    }

    onBackToUnits(){
        this.NavigationExtras.state = this.condominio;
        this.router.navigate(['/admin/comunicacion/individuales'], this.NavigationExtras);
    }

}
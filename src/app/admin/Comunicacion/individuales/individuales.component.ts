import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { UnidadesService } from '../../../services/unidades.service';

@Component({
    selector: 'app-individuales',
    templateUrl: './individuales.component.html',
    styleUrls: ['./individuales.component.css']
})

export class IndividualesComponent implements OnInit{

    idAministrador: string = '';
    idCondominio: string = '';
    unidades: any[] = [];
    condominio: any[] = [];
  
    NavigationExtras: NavigationExtras = {
      state: {
  
      }
    }

    constructor(
        private router: Router,
        private _unidadesService: UnidadesService
      ) {
    
        const navigations: any = this.router.getCurrentNavigation()?.extras.state;
        this.idAministrador = navigations.idAdministrador;
        this.idCondominio = navigations.idCondominio;
        this.condominio = navigations;
      }
    
    ngOnInit(){
        this.getUnidades();
    }


    getUnidades(){
        try {
            this._unidadesService
            .getAllUnidades(this.idCondominio)
            .subscribe(data => {
                data.forEach((element: any) => {
                    this.unidades.push({
                        ...element.payload.doc.data()
                    })
                })
            })
        }
        catch(err){
            console.log(err);
        }
    }

    onGoMensajesUsuarios(item: any){
        this.NavigationExtras.state = item;
        this.router.navigate(['/admin/comunicacion/mensajeUsuario'], this.NavigationExtras);
    }

    onGoNuevoMensaje(item: any){
        this.NavigationExtras.state = item;
        this.router.navigate(['/admin/comunicacion/nuevoMensaje'], this.NavigationExtras);
    }
}
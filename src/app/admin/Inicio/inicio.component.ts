import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { UnidadesService } from '../../services/unidades.service';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit{
    
    idAministrador: string = '';
    idCondominio: string = ';'
    unidades: any[] = [];
    condominio: any[] = [];
  
    navigationExtras: NavigationExtras = {
      state: {
  
      }
    }
  
    constructor(
      private router: Router,
      private _unidades: UnidadesService
    ) {
  
      const navigations: any = this.router.getCurrentNavigation()?.extras.state;
      this.idAministrador = navigations.idAdministrador;
      this.idCondominio = navigations.idCondominio;
      this.condominio = navigations;
  
    }
    
    ngOnInit(): void{
        this.getUnidades();
    }

    getUnidades() {
        try {
          this._unidades
            .getAllUnidadesOrdenadas(this.idCondominio)
            .subscribe(data => {
              data.forEach((element: any) => {
                this.unidades.push({
                  ...element.payload.doc.data()
                })
              })
            })
        }
        catch (err) {
          console.log(err);
        }
      }
}
import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { UnidadesService } from "src/app/services/unidades.service";
import { AnunciosGeneralesService } from '../../../services/anunciosGenerales.service';

@Component({
    selector: 'app-generales',
    templateUrl: './generales.component.html',
    styleUrls: ['./generales.component.css']
})

export class GeneralesComponent implements OnInit{

    idAministrador: string = '';
    idCondominio: string = ''
    anunciosGenerales: any[] = [];
    condominio: any[] = [];
  
    navigationExtras: NavigationExtras = {
      state: {
  
      }
    }
  

    constructor(
        private router: Router,
        private _anunciosGeneralesService: AnunciosGeneralesService
      ) {
    
        const navigations: any = this.router.getCurrentNavigation()?.extras.state;
        this.idAministrador = navigations.idAdministrador;
        this.idCondominio = navigations.idCondominio;
        this.condominio = navigations;
      }
    
    ngOnInit(): void{
        this.getAnunciosGenerales();
    }

    getAnunciosGenerales() {
        try {
          this._anunciosGeneralesService
            .getAnunciosGenerales(this.idCondominio)
            .subscribe(data => {
              data.forEach((element: any) => {
                this.anunciosGenerales.push({
                  ...element.payload.doc.data()
                })
              })
            })
        }
        catch (err) {
          console.log(err);
        }
      }

      onGoCreate(){
        this.navigationExtras.state = this.condominio;
        this.router.navigate(['/admin/comunicacion/nuevoAnuncio'], this.navigationExtras);
      }
    
      onDelete(item: any){
        const idAnuncioGeneral = item.idAnuncioGeneral;
        this._anunciosGeneralesService
        .deleteAnunciosGenerales(idAnuncioGeneral);
        alert('Anuncio eliminado correctamente');
      }
      
      onGoEdit(item: any){
        this.navigationExtras.state = item;
        this.router.navigate(['/admin/comunicacion/editarAnuncio'], this.navigationExtras);
      }
}
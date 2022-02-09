import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { AreasComunalesService } from '../../../services/areasComunales.service';

@Component({
  selector: 'app-ajustes-areas-comunales',
  templateUrl: './ajustes-areas-comunales.component.html',
  styleUrls: ['./ajustes-areas-comunales.component.css']
})
export class AjustesAreasComunalesComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = ';'
  areasComunales: any[] = [];
  condominio: any[] = [];

  navigationExtras: NavigationExtras = {
    state: {

    }
  }

  constructor(
    private router: Router,
    private _areaComunalService: AreasComunalesService
  ) {

    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
    //console.log('Dato obtenido en /areasComunales', navigations);

  }

  ngOnInit(): void {
    this.getAreasComunales();
  }

  getAreasComunales() {
    try {
      this._areaComunalService
        .getAreasComunales(this.idCondominio)
        .subscribe(data => {
          data.forEach((element: any) => {
            this.areasComunales.push({
              ...element.payload.doc.data()
            })
          })
          //console.log('Areas' , this.areasComunales);
        })
    }
    catch (err) {
      console.log(err);
    }
  }

  onGoCreate(){
    this.navigationExtras.state = this.condominio;
    this.router.navigate(['/admin/ajustes/ajustesAreasComunalesEdit'], this.navigationExtras);
  }

  onDelete(item: any){
    const idAreaComunalEliminar = item.idAreaComunal;
    this._areaComunalService
    .deleteAreasComunales(idAreaComunalEliminar);
    this.ngOnInit();
  }



}

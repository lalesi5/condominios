import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {UnidadesService} from "../../../services/unidades.service";

@Component({
  selector: 'app-ajustes-unidades',
  templateUrl: './ajustes-unidades.component.html',
  styleUrls: ['./ajustes-unidades.component.css']
})
export class AjustesUnidadesComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = ''
  unidades: any[] = [];
  condominio: any[] = [];

  navigationExtras: NavigationExtras = {
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

  ngOnInit(): void {
    this.getUnidades();
  }

  getUnidades() {
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
    catch (err) {
      console.log(err);
    }
  }

  onGoCreate(){
    this.navigationExtras.state = this.condominio;
    this.router.navigate(['/admin/ajustes/ajustesUnidadesCreate'], this.navigationExtras);
  }

  onDelete(item: any){
    const idAreaUnidadAEliminar = item.idUnidad;
    this._unidadesService
    .deleteUnidades(idAreaUnidadAEliminar);
    alert('Unidad eliminada correctamente');
  }
  
  onGoEdit(item: any){
    this.navigationExtras.state = item;
    this.router.navigate(['/admin/ajustes/ajustesUnidadesEdit'], this.navigationExtras);
  }

}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CondominioService } from '../../services/condominios.service';

@Component({
  selector: 'app-select-condominio',
  templateUrl: './select-condominio.component.html',
  styleUrls: ['./select-condominio.component.css']
})
export class SelectCondominioComponent implements OnInit {

  administrador: any[] = [];
  idAministrador: string = '';
  condominios: any[] = [];
  idCondominio: string = '';

  NavigationExtras: NavigationExtras = {
    state: {

    }
  }

  constructor(
    private router: Router,
    private _condominiosService: CondominioService
  ) {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.administrador = navigations;
    this.idAministrador = navigations.uid;
    //console.log('Id Administrador: ', this.idAministrador);
  }

  ngOnInit(): void {
    this.onListCondominios();
  }


  async onListCondominios() {
    try {
      this._condominiosService
        .getCondominios(this.idAministrador)
        .subscribe(data => {
          data.forEach((element: any) => {
            this.condominios.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            })
          })
          this.condominios.forEach((element:any) => {
            this.idCondominio = element.idCondominio
          })
          //console.log(this.condominios);
        })
    }
    catch (err) {
      console.log(err);
    }
  }

  async onGoAdmin(item: any) {
    console.log('Objeto: ', item, 'IdAdministrador: ', this.idAministrador,'idCondominio: ', this.idCondominio);
  }

  onGoCreate(){
    this.NavigationExtras.state = this.administrador;
    this.router.navigate(['/createCondominio'], this.NavigationExtras);
  }

}

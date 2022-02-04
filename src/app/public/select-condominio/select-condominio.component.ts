import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-select-condominio',
  templateUrl: './select-condominio.component.html',
  styleUrls: ['./select-condominio.component.css']
})
export class SelectCondominioComponent implements OnInit {

  idAministrador: string = '';
  condominios: any[] = [];
  idCondominio: string = ';';

  NavigationExtras: NavigationExtras = {
      state: {

      }
  }

  constructor(
      private router: Router,
      private _adminService: AdminService
  ) {
      const navigations: any = this.router.getCurrentNavigation()?.extras.state;
      this.idAministrador = navigations.uid;
      console.log('Id Administrador: ', this.idAministrador);
  }

  ngOnInit(): void {
    this.onListCondominios();
  }
  

  async onListCondominios(){
    try{
      this._adminService
      .getCondominiosAdministrador('venAdVbQzj8AtFR3FYCI')
      .subscribe(data => {
        data.forEach((element: any) => {
          this.condominios.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
        console.log(this.condominios);
      })
    }
    catch (err){
      console.log(err);
    }
  }

  async onGoAdmin(item: any){
    console.log('Boton',item, this.idAministrador);
  }

}

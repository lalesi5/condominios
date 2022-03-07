import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {AreasComunalesService} from '../../../services/areasComunales.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-ajustes-areas-comunales',
  templateUrl: './ajustes-areas-comunales.component.html',
  styleUrls: ['./ajustes-areas-comunales.component.css']
})
export class AjustesAreasComunalesComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = ''
  areasComunales: any[] = [];
  condominio: any[] = [];

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _areaComunalService: AreasComunalesService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.getAreasComunales();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
    this.NavigationExtras.state = this.condominio;
  }

  getAreasComunales() {
    try {
      this.subscription.add(
        this._areaComunalService
          .getAreasComunales(this.idCondominio)
          .subscribe(data => {
            data.forEach((element: any) => {
              this.areasComunales.push({
                ...element.payload.doc.data()
              })
            })
          })
      );
    } catch (err) {
      console.log(err);
    }
  }

  onGoCreate() {
    this.router.navigate(['/admin/ajustes/ajustesAreasComunalesCreate'], this.NavigationExtras);
  }

  onDelete(item: any) {
    let result = confirm("Esta seguro de eliminar el Area Comunal!");
    if (result) {
      const idAreaComunalEliminar = item.idAreaComunal;
      this._areaComunalService
        .deleteAreasComunales(idAreaComunalEliminar);
    }
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url], this.NavigationExtras);
  }

  onGoEdit(item: any) {
    this.NavigationExtras.state = item;
    this.router.navigate(['/admin/ajustes/ajustesAreasComunalesEdit'], this.NavigationExtras);
  }


}

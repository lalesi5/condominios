import {Component, OnDestroy, OnInit} from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AreasComunalesService} from "../../../services/areasComunales.service";

@Component({
  selector: 'app-areasComunes',
  templateUrl: './areasComunes.component.html',
  styleUrls: ['./areasComunes.component.css']
})

export class AreasComunesComponent implements OnInit, OnDestroy {

  private suscription: Subscription = new Subscription;
  areasComunes: any[] = [];
  idAministrador: string = '';
  condominios: any[] = [];
  idCondominio: string = '';

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _areasComunalesService: AreasComunalesService,
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.onListAreasComunales();
  }

  ngOnDestroy(): void {
    this.onListAreasComunales();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.condominios = navigations;
    this.NavigationExtras.state = this.condominios;
  }

  onListAreasComunales() {
    this.suscription.add(
      this._areasComunalesService.getAreasComunales(this.idCondominio).subscribe(data => {
        this.areasComunes = [];
        data.forEach((element: any) => {
          this.areasComunes.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }

  onGoReservas(item: any){
    this.NavigationExtras.state = item;
    this.router.navigate(['/admin/administracion/reservas', item.idAreaComunal], this.NavigationExtras);
  }


}

import {Component, OnDestroy, OnInit} from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AreasComunalesService} from "../../services/areasComunales.service";

@Component({
  selector: 'app-areasComunesUsuario',
  templateUrl: './areasComunesUsuario.component.html',
  styleUrls: ['./areasComunesUsuario.component.css']
})

export class AreasComunesUsuarioComponent implements OnInit, OnDestroy {

  private suscription: Subscription = new Subscription;
  areasComunes: any[] = [];
  unidad: any[] = [];
  numeroUnidad: string = '';
  idCondominio: string = '';
  idUnidad: string = '';
  nombreResidente: string = '';
  apellidoResidente: string = '';

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _areasComunalesService: AreasComunalesService,
  ) {
    this.recoverData()
  }

  ngOnInit() {
    this.onListAreasComunales();
  }

  ngOnDestroy(): void {
    this.onListAreasComunales();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.numeroUnidad = navigations.numeroUnidad;
    this.idCondominio = navigations.idCondominio;
    this.idUnidad = navigations.idUnidad;
    this.nombreResidente =  navigations.nombreResidente;
    this.apellidoResidente = navigations.apellidoResidente;
    this.unidad = navigations;
    this.NavigationExtras.state = this.unidad;
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
    const unidad = {
      numeroUnidad: this.numeroUnidad,
      idUnidad: this.idUnidad,
      nombreResidente: this.nombreResidente,
      apellidoResidente: this.apellidoResidente
    };
    const data = {
      ...unidad,
      ...item
    }
    this.NavigationExtras.state = data;
    this.router.navigate(['/user/reservas'], this.NavigationExtras);
  }

}

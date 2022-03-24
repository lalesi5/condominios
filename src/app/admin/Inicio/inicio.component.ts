import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UnidadesService } from '../../services/unidades.service';
import {ReservasService} from "../../services/reservas.service";
import {AnunciosGeneralesService} from "../../services/anunciosGenerales.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = ';'
  unidades: any[] = [];
  reservas: any[] = [];
  condominio: any[] = [];
  anuncios: any[] = [];

  navigationExtras: NavigationExtras = {
    state: {

    }
  }

  constructor(
    private router: Router,
    private _unidades: UnidadesService,
    private _reservas: ReservasService,
    private _anuncios: AnunciosGeneralesService
  ) {

    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
    this.navigationExtras.state =  this.condominio;

  }

  ngOnInit(): void {
    this.getUnidades();
    this.getReservas();
    this.getAnuncios();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUnidades() {
    this.subscription.add(
      this._unidades.getAllUnidadesOrdenadas(this.idCondominio).subscribe(data => {
        this.unidades = [];
        data.forEach((element: any) => {
          this.unidades.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  getReservas(){
    this.subscription.add(
      this._reservas.getReservas(this.idCondominio).subscribe(data => {
        this.reservas = [];
        data.forEach((element:any) => {
          this.reservas.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }

  getAnuncios(){
    this.subscription.add(
      this._anuncios.getAnunciosGenerales(this.idCondominio).subscribe(data => {
        this.anuncios = [];
        data.forEach((element:any) => {
          this.anuncios.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }

  onGoUnidades(){
    this.router.navigate(['/admin/administracion'], this.navigationExtras);
  }

  onGoReservas(){
    this.router.navigate(['/admin/administracion/areasComunes'], this.navigationExtras);
  }

  onGoMensajes(){
    this.router.navigate(['/admin/comunicacion/generales'], this.navigationExtras);
  }
}

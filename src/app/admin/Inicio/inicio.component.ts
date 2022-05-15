import {Component, OnDestroy, OnInit} from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UnidadesService} from '../../services/unidades.service';
import {ReservasService} from "../../services/reservas.service";
import {AnunciosGeneralesService} from "../../services/anunciosGenerales.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idCondominio: string = ';'
  unidades: any[] = [];
  reservas: any[] = [];
  reservasPendientes: any[] = [];
  anuncios: any[] = [];

  constructor(
    private router: Router,
    private _unidades: UnidadesService,
    private _reservas: ReservasService,
    private _anuncios: AnunciosGeneralesService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.getUnidades();
    this.getReservas();
    this.getAnuncios();
    this.getReservasPendientes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idCondominio = <string> sessionStorage.getItem('idCondominio');
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

  getReservas() {
    this.subscription.add(
      this._reservas.getReservas(this.idCondominio).subscribe(data => {
        this.reservas = [];
        data.forEach((element: any) => {
          this.reservas.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }

  getReservasPendientes() {
    this.subscription.add(
      this._reservas.getReservasPendientes(this.idCondominio).subscribe(data => {
        this.reservasPendientes = [];
        data.forEach((element: any) => {
          this.reservasPendientes.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }


  getAnuncios() {
    this.subscription.add(
      this._anuncios.getAnunciosGenerales(this.idCondominio).subscribe(data => {
        this.anuncios = [];
        data.forEach((element: any) => {
          this.anuncios.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }

  onGoUnidades() {
    this.router.navigate(['/admin/administracion/listarUnidades']);
  }

  onGoReservas() {
    this.router.navigate(['/admin/administracion/areasComunes/reservasPendientes']);
  }

  onGoMensajes() {
    this.router.navigate(['/admin/comunicacion/generales']);
  }
}

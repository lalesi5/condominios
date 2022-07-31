import {Component, OnDestroy, OnInit} from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UnidadesService} from '../../services/unidades.service';
import {ReservasService} from "../../services/reservas.service";
import {AnunciosGeneralesService} from "../../services/anunciosGenerales.service";
import { MensajesService } from "src/app/services/mensajes.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idCondominio: string = ';'
  idUnidad: string = '';
  idUsuario: string = '';
  unidades: any[] = [];
  reservas: any[] = [];
  reservasPendientes: any[] = [];
  anuncios: any[] = [];
  mensajes: any[] = [];

  constructor(
    private router: Router,
    private _unidades: UnidadesService,
    private _reservas: ReservasService,
    private _anuncios: AnunciosGeneralesService,
    private _mensajesService: MensajesService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.getUnidades();
    this.getReservas();
    this.getMensajes();
    this.getReservasPendientes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idCondominio = <string> sessionStorage.getItem('idCondominio');
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
    this.idUsuario = <string>sessionStorage.getItem('idUsuario');
  }

  getUnidades() {
    this.subscription.add(
      this._unidades.getAllUnidades(this.idCondominio).subscribe(data => {
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
      this._reservas.getReservasEnCondominio(this.idCondominio).subscribe(data => {
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

  getMensajes() {
    this.subscription.add(
      this._mensajesService.getMensajesNoVistosAdmin(this.idUsuario, this.idUnidad).subscribe(data => {
        this.mensajes = [];
        data.forEach((element: any) => {
          this.mensajes.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onGoUnidades() {
    this.router.navigate(['/admin/administracion/listarUnidades']);
  }

  onGoReservas() {
    this.router.navigate(['/admin/administracion/areasComunes/reservasPendientes']);
  }

  onGoReservasTotales() {
    this.router.navigate(['/admin/administracion/areasComunes/reservasTotales']);
  }

  onGoMensajes() {
    this.router.navigate(['/admin/comunicacion/individuales']);
  }
}

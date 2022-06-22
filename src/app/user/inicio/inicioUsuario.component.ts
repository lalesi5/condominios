import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ReservasService} from "src/app/services/reservas.service";
import {AnunciosGeneralesService} from "../../services/anunciosGenerales.service";
import {MensajesService} from "../../services/mensajes.service";
import {UnidadesService} from "../../services/unidades.service";

@Component({
  selector: 'app-inicioUsuario',
  templateUrl: './inicioUsuario.component.html',
  styleUrls: ['./inicioUsuario.component.css']
})

export class InicioUsuarioComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  idUnidad: string = '';
  idUsuario: string = '';
  anunciosGenerales: any[] = [];
  unidad: any[] = [];
  reservas: any[] = [];
  mensajes: any[] = [];
  cuotaUnidad: number = 0;
  sumaValorReservas: number = 0;

  constructor(
    private router: Router,
    private _reservaService: ReservasService,
    private _unidadesService: UnidadesService,
    private _anunciosGeneralesService: AnunciosGeneralesService,
    private _mensajesService: MensajesService
  ) {
    this.recoverData()
  }

  ngOnInit(): void {
    this.getAnunciosGenerales();
    this.getReservas();
    this.getMensajesUsuario();
    this.getValoresReservas();
    this.getUnidadCuotaReserva();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
    this.idUsuario = <string>sessionStorage.getItem('idUsuario');
  }

  getReservas() {
    this.subscription.add(
      this._reservaService.getReservasUsuarioPendientes(this.idCondominio, this.idUnidad).subscribe(data => {
        this.reservas = [];
        data.forEach((element: any) => {
          this.reservas.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  getAnunciosGenerales() {
    this.subscription.add(
      this._anunciosGeneralesService.getAnunciosGenerales(this.idCondominio).subscribe(data => {
        this.anunciosGenerales = [];
        data.forEach((element: any) => {
          this.anunciosGenerales.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  getMensajesUsuario() {
    this.subscription.add(
      this._mensajesService.getMensajes(this.idUsuario, this.idUnidad).subscribe(data => {
        this.mensajes = [];
        data.forEach((element: any) => {
          this.mensajes.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  getValoresReservas() {
    this.subscription.add(
      this._reservaService.getReservasValorPago(this.idUnidad).subscribe(data => {
        this.reservas = [];
        this.sumaValorReservas = 0;
        data.forEach((element: any) => {
          this.reservas.push({
            ...element.payload.doc.data()
          })
        })
        //suma todos los valores de reservas que pertenecen a esa unidad y que tienen pagoReserva = Por Pagar
        this.reservas.map(data => {
          this.sumaValorReservas += data.valorReserva;
        })
      })
    )
  }

  getUnidadCuotaReserva() {
    this.subscription.add(
      this._unidadesService.getUnidadesById(this.idUnidad).subscribe(data => {
        this.unidad = [];
        this.cuotaUnidad = 0;
        data.forEach((element: any) => {
          this.unidad.push({
            ...element.payload.doc.data()
          })
        })
        this.unidad.map(data => {
          this.cuotaUnidad = data.cuotaUnidad;
        })
      })
    )
  }
}

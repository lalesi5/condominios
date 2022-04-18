import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ReservasService} from "../../../services/reservas.service";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {UnidadesService} from "../../../services/unidades.service";

@Component({
  selector: 'app-registro-mensualidad',
  templateUrl: './registro-mensualidad.component.html',
  styleUrls: ['./registro-mensualidad.component.css']
})
export class RegistroMensualidadComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idUnidad: string = '';
  reservas: any[] = [];
  unidad: any[] = [];
  sumaValorReservas: number = 0;
  cuotaUnidad: number = 0;

  constructor(
    private _reservasService: ReservasService,
    private _unidadesService: UnidadesService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.getValoresReservas();
    this.getUnidadCuotaReserva();
  }

  recoverData() {
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
  }

  getValoresReservas() {
    this.subscription.add(
      this._reservasService.getReservasValorPago(this.idUnidad).subscribe(data => {
        this.reservas = [];
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

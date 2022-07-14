import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UnidadesService } from "../../../services/unidades.service";
import { ReservasService } from "../../../services/reservas.service";

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})

export class UnidadesComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idUnidad: string = '';
  unidad: any[] = [];
  unidades: any[] = [];
  reservas: any[] = [];
  cuotaUnidad: number = 0;
  sumaValorReservas: number = 0;

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
    private _reservasService: ReservasService,
  ) {
    this.recoverData();
  }

  ngOnInit() {
    this.listarUnidad();
    this.getValoresReservas();
    this.getUnidadCuotaReserva();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/administracion/listarUnidades']);
  }

  listarUnidad() {
    this.subscription.add(
      this._unidadesService.getUnidadesById(this.idUnidad).subscribe(data => {
        this.unidades = [];
        data.forEach((element: any) => {
          this.unidades.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
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

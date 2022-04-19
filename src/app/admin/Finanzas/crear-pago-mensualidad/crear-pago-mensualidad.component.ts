import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UnidadesService} from "../../../services/unidades.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-crear-pago-mensualidad',
  templateUrl: './crear-pago-mensualidad.component.html',
  styleUrls: ['./crear-pago-mensualidad.component.css']
})
export class CrearPagoMensualidadComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAdministrador: string = '';
  idCondominio: string = '';
  idUnidad: string = '';
  loading = false;

  unidad: any[] = [];

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
  ) {
    this.recoverData()
  }

  ngOnInit(): void {
    this.getDatoUnidad();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idAdministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
  }

  getDatoUnidad() {
    this.subscription.add(
      this._unidadesService.getUnidadesById(this.idUnidad).subscribe(data => {
        this.unidad = [];
        data.forEach((element: any) => {
          this.unidad.push({
            ...element.payload.doc.data()
          })
        })
        console.log(this.unidad);
      })
    );
  }

  onBacktoList(): void {
    this.router.navigate(['admin/finanzas//registrarMensualidad']);
  }

}

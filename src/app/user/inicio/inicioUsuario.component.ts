import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import { ReservasService } from "src/app/services/reservas.service";
import {AnunciosGeneralesService} from "../../services/anunciosGenerales.service";

@Component({
  selector: 'app-inicioUsuario',
  templateUrl: './inicioUsuario.component.html',
  styleUrls: ['./inicioUsuario.component.css']
})

export class InicioUsuarioComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idCondominio: string ='';
  idUnidad: string ='';
  anunciosGenerales: any[] = [];
  reservas: any[] = [];

  constructor(
    private router: Router,
    private _reservaService: ReservasService,
    private _anunciosGeneralesService: AnunciosGeneralesService,
  ) {
    this.recoverData()
  }

  ngOnInit(): void {
    this.getAnunciosGenerales();
    this.getReservas();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
  }

  getReservas() {
    this.subscription.add(
      this._reservaService.getReservasUsuario(this.idCondominio, this.idUnidad).subscribe(data => {
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
}

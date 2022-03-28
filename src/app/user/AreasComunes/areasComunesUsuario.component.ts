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
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
    this.nombreResidente = <string>sessionStorage.getItem('nombreResidente');
    this.apellidoResidente = <string>sessionStorage.getItem('apellidoResidente');
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
    sessionStorage.setItem('idAreaComunal', <string>item.idAreaComunal);
    sessionStorage.setItem('nombreAreaComunal', <string>item.nombre);
    this.router.navigate(['/user/reservas']);
  }

}

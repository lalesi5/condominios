import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UnidadesService} from '../../../services/unidades.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-individuales',
  templateUrl: './individuales.component.html',
  styleUrls: ['./individuales.component.css']
})

export class IndividualesComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  unidades: any[] = [];

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService
  ) {
    this.recoverData();
  }

  ngOnInit() {
    this.getUnidades();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }


  getUnidades() {
    this.subscription.add(
      this._unidadesService
        .getAllUnidadesOrdenadas(this.idCondominio)
        .subscribe(data => {
          this.unidades = [];
          data.forEach((element: any) => {
            this.unidades.push({
              ...element.payload.doc.data()
            })
          })
        })
    )
  }

  onGoMensajesUsuarios(item: any) {
    sessionStorage.setItem('idUnidad', <string>item.idUnidad);
    sessionStorage.setItem('idUsuario', <string>item.idUsuario);
    sessionStorage.setItem('nombreResidente', <string>item.nombreResidente);
    sessionStorage.setItem('apellidoResidente', <string>item.apellidoResidente);
    this.router.navigate(['/admin/comunicacion/mensajeUsuario']);
  }

  onGoNuevoMensaje(item: any) {
    sessionStorage.setItem('idUnidad', <string>item.idUnidad);
    this.router.navigate(['/admin/comunicacion/nuevoMensaje']);
  }
}

import {Component, OnInit} from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";
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
  condominio: any[] = [];

  NavigationExtras: NavigationExtras = {
    state: {}
  }

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
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
  }


  getUnidades() {
    this.subscription.add(
      this._unidadesService
        .getAllUnidadesOrdenadas(this.idCondominio)
        .subscribe(data => {
          data.forEach((element: any) => {
            this.unidades.push({
              ...element.payload.doc.data()
            })
          })
        })
    )
  }

  onGoMensajesUsuarios(item: any) {
    this.NavigationExtras.state = item;
    this.router.navigate(['/admin/comunicacion/mensajeUsuario'], this.NavigationExtras);
  }

  onGoNuevoMensaje(item: any) {
    this.NavigationExtras.state = item;
    this.router.navigate(['/admin/comunicacion/nuevoMensaje'], this.NavigationExtras);
  }
}

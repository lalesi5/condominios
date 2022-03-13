import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnidadesService } from "../../../services/unidades.service";

@Component({
  selector: 'app-ajustes-unidades',
  templateUrl: './ajustes-unidades.component.html',
  styleUrls: ['./ajustes-unidades.component.css']
})
export class AjustesUnidadesComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  idUsuario: string = '';
  usuario: any[] = [];
  unidades: any[] = [];
  condominio: any[] = [];

  navigationExtras: NavigationExtras = {
    state: {

    }
  }

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.getUnidades();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData(){
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.idUsuario = navigations.idUsuario;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  getUnidades() {
    try {
      this.subscription.add(
        this._unidadesService
          .getAllUnidadesIdUser(this.idUsuario)
          .subscribe(data => {
            data.forEach((element: any) => {
              this.unidades.push({
                ...element.payload.doc.data()
              })
            })
          })
      )
    }
    catch (err) {
      console.log(err);
    }
  }

  onGoCreate() {
    this.router.navigate(['/admin/ajustes/ajustesUnidadesCreate'], this.navigationExtras);
  }

  onDelete(item: any) {
    let result = confirm("Esta seguro de eliminar el Area Comunal!");
    if (result) {
      const idAreaUnidadAEliminar = item.idUnidad;
      this._unidadesService
        .deleteUnidades(idAreaUnidadAEliminar);
    }
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url], this.navigationExtras);
  }

  onGoEdit(item: any) {
    this.navigationExtras.state = item;
    this.router.navigate(['/admin/ajustes/ajustesUnidadesEdit'], this.navigationExtras);
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesUnidadesSelectUser'], this.navigationExtras);
  }

}

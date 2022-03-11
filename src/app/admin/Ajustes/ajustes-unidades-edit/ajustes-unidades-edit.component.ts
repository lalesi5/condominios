import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UnidadesService} from 'src/app/services/unidades.service';

@Component({
  selector: 'app-ajustes-unidades-edit',
  templateUrl: './ajustes-unidades-edit.component.html',
  styleUrls: ['./ajustes-unidades-edit.component.css']
})
export class AjustesUnidadesEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  idUnidad: string = '';
  unidades: any[] = [];
  condominio: any[] = [];

  unidadesForm = new FormGroup({
    numeroUnidad: new FormControl,
    tipoUnidad: new FormControl,
    areaUnidad: new FormControl,
    nombreArrendatario: new FormControl,
    apellidoArrendatario: new FormControl,
    celularArrendatario: new FormControl,
    emailArrendatario: new FormControl,
    nombreArrendador: new FormControl,
    ApellidoArrendador: new FormControl,
    emailArrendador: new FormControl,
    celularArrendador: new FormControl
  })

  navigationExtras: NavigationExtras = {
    state: {}
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

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.idUnidad = navigations.idUnidad;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  getUnidades() {
    try {
      this.subscription.add(
        this._unidadesService
          .getUnidadesById(this.idUnidad)
          .subscribe(data => {
            data.forEach((element: any) => {
              this.unidades.push({
                ...element.payload.doc.data()
              })
            })
          })
      )
    } catch (err) {
      console.log(err);
    }
  }

  onBacktoList(): void {

    this.router.navigate(['/admin/ajustes/ajustesUnidades'], this.navigationExtras);
  }

  onEditUnidades() {
    this._unidadesService.saveUnidades(this.unidadesForm.value, this.idAministrador, this.idCondominio, this.idUnidad);
  }

}

import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';
import {UnidadesService} from '../../../services/unidades.service';

@Component({
  selector: 'app-ajustes-unidades-create',
  templateUrl: './ajustes-unidades-create.component.html',
  styleUrls: ['./ajustes-unidades-create.component.css']
})
export class AjustesUnidadesCreateComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = '';
  unidades: any[] = [];
  condominio: any[] = [];
  usuario: any[] = [];

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
    private _unidadesService: UnidadesService,
  ) {
  this.recoverData();
  }

  ngOnInit(): void {
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesUnidades'], this.navigationExtras);
  }

  onCreateUnidades() {
    this._unidadesService.saveUnidades(this.unidadesForm.value,
      this.idAministrador,
      this.idCondominio);
    this.router.navigate(['/admin/ajustes'], this.navigationExtras);
  }
}

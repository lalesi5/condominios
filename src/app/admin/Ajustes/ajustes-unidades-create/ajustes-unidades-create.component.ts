import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UnidadesService } from '../../../services/unidades.service';

@Component({
  selector: 'app-ajustes-unidades-create',
  templateUrl: './ajustes-unidades-create.component.html',
  styleUrls: ['./ajustes-unidades-create.component.css']
})
export class AjustesUnidadesCreateComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = ''
  unidades: any[] = [];
  condominio: any[] = [];
  usuario: any[] = [];

  unidadesForm = new FormGroup({
    numeroUnidad: new FormControl,
    tipoUnidad: new FormControl,
    areaUnidad: new FormControl,
    nombreArrendatario: new FormControl,
    apellidoArrendatario: new FormControl,
    telefonoArrendatario: new FormControl,
    celularArrendatario: new FormControl,
    passwordArrendatario: new FormControl,
    emailArrendatario: new FormControl,
    nombreArrendador: new FormControl,
    ApellidoArrendador: new FormControl,
    emailArrendador: new FormControl

  })

  navigationExtras: NavigationExtras = {
    state: {

    }
  }

  constructor(    
    private router: Router,
    private _unidadesService: UnidadesService,
  ) {

    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
  }
  ngOnInit(): void {
  }

  onBacktoList(): void {
    this.navigationExtras.state = this.condominio;
    this.router.navigate(['/admin/ajustes/ajustesUnidades'], this.navigationExtras);
  }

  onCreateUnidades() {
    this.navigationExtras.state = this.condominio;
    this._unidadesService.saveUnidades(this.unidadesForm.value, this.idAministrador, this.idCondominio);
  }
}

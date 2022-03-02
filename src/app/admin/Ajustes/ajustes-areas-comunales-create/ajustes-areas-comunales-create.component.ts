import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AreasComunalesService } from 'src/app/services/areasComunales.service';

@Component({
  selector: 'app-ajustes-areas-comunales-create',
  templateUrl: './ajustes-areas-comunales-create.component.html',
  styleUrls: ['./ajustes-areas-comunales-create.component.css']
})
export class AjustesAreasComunalesCreateComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = ';'
  areasComunales: any[] = [];
  condominio: any[] = [];

  /*Formularios*/

  areaComunalForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  navigationExtras: NavigationExtras = {
    state: {

    }
  }

  constructor(
    private router: Router,
    private _AreaComunalService: AreasComunalesService,
    private fb: FormBuilder
  ) {

    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
    console.log('Dato obtenido en /areasComunalesEdit', navigations);

  }

  ngOnInit(): void {
  }

  onBacktoList(): void {
    this.navigationExtras.state = this.condominio;
    this.router.navigate(['/admin/ajustes/ajustesAreasComunales'], this.navigationExtras);
  }

  onCreateAreaComunal() {
    this.navigationExtras.state = this.condominio;
    this._AreaComunalService.saveAreasComunales(this.areaComunalForm.value, this.idAministrador, this.idCondominio);
  }

}

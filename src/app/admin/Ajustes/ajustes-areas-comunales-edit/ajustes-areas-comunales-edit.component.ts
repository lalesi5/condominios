import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AreasComunalesService } from '../../../services/areasComunales.service';

@Component({
  selector: 'app-ajustes-areas-comunales-edit',
  templateUrl: './ajustes-areas-comunales-edit.component.html',
  styleUrls: ['./ajustes-areas-comunales-edit.component.css']
})
export class AjustesAreasComunalesEditComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = '';
  idAreaComunal: string = '';
  areasComunales: any[] = [];
  condominio: any[] = [];

  /*Formularios*/

  areaComunalForm = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
  })

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
    this.idAreaComunal = navigations.idAreaComunal;
    this.condominio = navigations;
    console.log('Dato obtenido en /areasComunalesEdit', navigations);

  }

  ngOnInit(): void {
    this.areaComunalForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
  }


  onBacktoList(): void {
    this.navigationExtras.state = this.condominio;
    this.router.navigate(['/admin/ajustes/ajustesAreasComunales'], this.navigationExtras);
  }

  onEditAreaComunal() {
    this.navigationExtras.state = this.condominio;
    this._AreaComunalService.updateAreasComunales(this.areaComunalForm.value, this.idAministrador, this.idCondominio, this.idAreaComunal);
  }

}

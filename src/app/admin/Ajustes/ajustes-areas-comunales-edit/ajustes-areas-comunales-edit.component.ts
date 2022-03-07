import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';
import {AreasComunalesService} from '../../../services/areasComunales.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-ajustes-areas-comunales-edit',
  templateUrl: './ajustes-areas-comunales-edit.component.html',
  styleUrls: ['./ajustes-areas-comunales-edit.component.css']
})
export class AjustesAreasComunalesEditComponent implements OnInit {

  private subscription: Subscription = new Subscription;
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
    state: {}
  }

  constructor(
    private router: Router,
    private _AreaComunalService: AreasComunalesService,
    private fb: FormBuilder
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.onListAreaComunal();
    this.areaComunalForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.idAreaComunal = navigations.idAreaComunal;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  onListAreaComunal() {
    try {
      this.subscription.add(
        this._AreaComunalService
          .getAreasComunalesID(this.idAreaComunal)
          .subscribe(data => {
            data.forEach((element: any) => {
              this.areasComunales.push({
                ...element.payload.doc.data()
              })
            })
          })
      );
    } catch (err) {
      console.log(err);
    }
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesAreasComunales'], this.navigationExtras);
  }

  onEditAreaComunal() {

    let result = confirm("Esta seguro de modificar la información")
    if (result) {
      this._AreaComunalService.updateAreasComunales(this.areaComunalForm.value,
        this.idAministrador,
        this.idCondominio,
        this.idAreaComunal);
      alert('Area Comunal actualizada correctamente');
      this.router.navigate(['/admin/ajustes'], this.navigationExtras);

    }
  }

}

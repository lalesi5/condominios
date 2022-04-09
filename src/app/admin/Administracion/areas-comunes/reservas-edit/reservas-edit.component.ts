import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AreasComunalesService } from 'src/app/services/areasComunales.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'app-reservas-edit',
  templateUrl: './reservas-edit.component.html',
  styleUrls: ['./reservas-edit.component.css']
})
export class ReservasEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAdministrador: string = '';
  idCondominio: string = '';
  idReserva: string = '';
  idUnidad: string = '';
  idAreaComunal: string = '';
  numeroUnidad: string = '';
  loading = false;
  areaComunal: any[] = [];
  unidades: any[] = [];
  unidad: any[] = [];
  area: any[] = [];
  areas: any[] = [];

  reservaForm: FormGroup;
  datosUnidadForm: FormGroup;
  areaComunalForm: FormGroup;

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
    private _reservaService: ReservasService,
    private _AreaComunalService: AreasComunalesService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.reservaForm = this.fb.group({
      fechaReservaInicio: ['', Validators.required],
      fechaReservaFin: ['', Validators.required],
      detalleReserva: ['', Validators.required],
      estadoReserva: ['', Validators.required],
      idUnidad: ['', Validators.required],
      idAreaComunal: ['', Validators.required],
    });

    this.datosUnidadForm = this.fb.group({
      nombreResidente: [''],
      apellidoResidente: [''],
      unidad: ['']
    })

    this.areaComunalForm = this.fb.group({
      nombre: ['', Validators.required]
    })
    this.recoverData();
  }

  ngOnInit(): void {
    this.getDatosUnidades();
    this.getDatosAreas();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idAdministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idReserva = <string>sessionStorage.getItem('idReserva');
    this.idAreaComunal = <string>sessionStorage.getItem('idAreaComunal');
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
  }

  getReserva() {
    if (this.idReserva !== null) {
      this.loading = true;
      this.subscription.add(
        this._reservaService.getReservaId(this.idReserva).subscribe(data => {
          this.loading = false;
          this.reservaForm.setValue({
            fechaReservaInicio: data.payload.data()['fechaReservaInicio'],
            fechaReservaFin: data.payload.data()['fechaReservaFin'],
            detalleReserva: data.payload.data()['detalleReserva'],
            estadoReserva: data.payload.data()['estadoReserva'],
            idUnidad: data.payload.data()['idUnidad'],
            idAreaComunal: data.payload.data()['idAreaComunal'],
          })
        })
      )
    }
  }

  /*getUnidad() {
    this.loading = true;
    this.subscription.add(
      this._usuarioService.getUsuario(this.idUsuario).subscribe(data => {
        this.loading = false;
        this.datosUnidadForm.setValue({
          nombreResidente: data.payload.data()['name'],
          apellidoResidente: data.payload.data()['last_name'],
          unidad: data.payload.data()['unidad'],
        })
      })
    )
  }*/

  getDatosUnidades() {
    this.subscription.add(
      this._unidadesService.getAllUnidades(this.idCondominio).subscribe(data => {
        this.unidades = [];
        data.forEach((element: any) => {
          this.unidades.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  getDatosAreas() {
    this.subscription.add(
      this._AreaComunalService.getAreasComunales(this.idCondominio).subscribe(data => {
        this.areas = [];
        data.forEach((element: any) => {
          this.areas.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onBacktoList(): void {
    this.router.navigate(['admin/administracion/areasComunes/reservasPendientes']);
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
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


  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
    private toastr: ToastrService,
    private _dialogService: DialogService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.getDatosUnidades();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData(){
    this.idAministrador = <string> sessionStorage.getItem('idAministrador');
    this.idCondominio = <string> sessionStorage.getItem('idCondominio');
    this.idUsuario = <string> sessionStorage.getItem('idUsuario');
  }

  getDatosUnidades() {
    this.subscription.add(
      this._unidadesService.getAllUnidadesIdUser(this.idUsuario).subscribe(data => {
        this.unidades = [];
        data.forEach((element: any) => {
          this.unidades.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onGoCreate() {
    this.router.navigate(['/admin/ajustes/ajustesUnidadesCreate']);
  }

  onDelete(id: string) {
    this._dialogService.confirmDialog({
      title: 'Eliminar Unidad',
      message: '¿Está seguro de eliminar la información?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this._unidadesService.deleteUnidades(id).then(() => {
          this.toastr.success('El registro fue eliminado con exito', 'Registro eliminado', {
            positionClass: 'toast-bottom-right'
          });
        }).catch(error => {
          console.log(error);
        })
      }
    });
  }

  onGoEdit(item: any) {
    sessionStorage.setItem('idUnidad', <string> item.idUnidad);
    this.router.navigate(['/admin/ajustes/ajustesUnidadesEdit']);
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesUnidadesSelectUser']);
  }

}

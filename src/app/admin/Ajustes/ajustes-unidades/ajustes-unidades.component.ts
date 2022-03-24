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

  navigationExtras: NavigationExtras = {
    state: {

    }
  }

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
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.idUsuario = navigations.idUsuario;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
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
    this.router.navigate(['/admin/ajustes/ajustesUnidadesCreate'], this.navigationExtras);
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
    this.navigationExtras.state = item;
    this.router.navigate(['/admin/ajustes/ajustesUnidadesEdit', item.idUnidad], this.navigationExtras);
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesUnidadesSelectUser'], this.navigationExtras);
  }

}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AreasComunalesService} from '../../../services/areasComunales.service';
import {Subscription} from "rxjs";
import {DialogService} from 'src/app/services/dialog.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-ajustes-areas-comunales',
  templateUrl: './ajustes-areas-comunales.component.html',
  styleUrls: ['./ajustes-areas-comunales.component.css']
})
export class AjustesAreasComunalesComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = ''
  areasComunales: any[] = [];

  constructor(
    private router: Router,
    private _areaComunalService: AreasComunalesService,
    private toastr: ToastrService,
    private _dialogService: DialogService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.getAreasComunales();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getAreasComunales() {
    this.subscription.add(
      this._areaComunalService.getAreasComunales(this.idCondominio).subscribe(data => {
        this.areasComunales = [];
        data.forEach((element: any) => {
          this.areasComunales.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onDelete(id: string) {

    this._dialogService.confirmDialog({
      title: 'Eliminar área',
      message: '¿Está seguro de eliminar el área?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this._areaComunalService.deleteAreasComunales(id).then(() => {
          this.toastr.success('El registro fue eliminado con exito', 'Registro eliminado', {
            positionClass: 'toast-bottom-right'
          });
        }).catch(error => {
          console.log(error);
        })
      }
    });

  }

  onGoCreate() {
    this.router.navigate(['/admin/ajustes/ajustesAreasComunalesCreate']);
  }

  onGoEdit(item: any) {
    sessionStorage.setItem('idAreaComunal', <string>item.idAreaComunal);
    this.router.navigate(['/admin/ajustes/ajustesAreasComunalesEdit']);
  }
}

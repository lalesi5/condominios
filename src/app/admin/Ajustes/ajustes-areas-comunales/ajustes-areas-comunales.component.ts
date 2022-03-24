import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AreasComunalesService } from '../../../services/areasComunales.service';
import { Subscription } from "rxjs";
import { DialogService } from 'src/app/services/dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajustes-areas-comunales',
  templateUrl: './ajustes-areas-comunales.component.html',
  styleUrls: ['./ajustes-areas-comunales.component.css']
})
export class AjustesAreasComunalesComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = ''
  areasComunales: any[] = [];
  condominio: any[] = [];

  NavigationExtras: NavigationExtras = {
    state: {}
  }

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
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
    this.NavigationExtras.state = this.condominio;
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
    this.router.navigate(['/admin/ajustes/ajustesAreasComunalesCreate'], this.NavigationExtras);
  }

  onGoEdit(item: any) {
    this.NavigationExtras.state = item;
    this.router.navigate(['/admin/ajustes/ajustesAreasComunalesEdit', item.id], this.NavigationExtras);
  }
}

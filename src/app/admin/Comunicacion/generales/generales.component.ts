import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { AnunciosGeneralesService } from '../../../services/anunciosGenerales.service';
import { DialogService } from "../../../services/dialog.service";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})

export class GeneralesComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idCondominio: string = ''
  anunciosGenerales: any[] = [];
  condominio: any[] = [];

  navigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _anunciosGeneralesService: AnunciosGeneralesService,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.getAnunciosGenerales();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  getAnunciosGenerales() {
    this.subscription.add(
      this._anunciosGeneralesService.getAnunciosGenerales(this.idCondominio).subscribe(data => {
        this.anunciosGenerales = [];
        data.forEach((element: any) => {
          this.anunciosGenerales.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onGoCreate() {
    this.router.navigate(['/admin/comunicacion/nuevoAnuncio'], this.navigationExtras);
  }

  onDelete(id: string) {

    this._dialogService.confirmDialog({
      title: 'Eliminar área',
      message: '¿Está seguro de eliminar el anuncio general?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this._anunciosGeneralesService.deleteAnunciosGenerales(id).then(() => {
          this.toastr.success('El anuncio fue eliminado con exito', 'Anuncio eliminado', {
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
    this.router.navigate(['/admin/comunicacion/editarAnuncio', item.idAnuncioGeneral], this.navigationExtras);
  }
}

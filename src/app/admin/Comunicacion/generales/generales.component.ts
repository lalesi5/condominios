import {Component, OnInit} from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";
import {AnunciosGeneralesService} from '../../../services/anunciosGenerales.service';
import {DialogService} from "../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})

export class GeneralesComponent implements OnInit {

  idAministrador: string = '';
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

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  getAnunciosGenerales() {
    try {
      this._anunciosGeneralesService
        .getAnunciosGenerales(this.idCondominio)
        .subscribe(data => {
          data.forEach((element: any) => {
            this.anunciosGenerales.push({
              ...element.payload.doc.data()
            })
          })
        })
    } catch (err) {
      console.log(err);
    }
  }

  onGoCreate() {
    this.router.navigate(['/admin/comunicacion/nuevoAnuncio'], this.navigationExtras);
  }

  onDelete(item: any) {
    let idAnuncio = item.idAnuncioGeneral;
    let result = confirm("Esta seguro de eliminar el Area Comunal!");
    if (result) {
      this._anunciosGeneralesService.deleteAnunciosGenerales(idAnuncio).then(() => {
        this.toastr.success('El Anuncio fue eliminado con exito', 'Anuncio Elminado', {
          positionClass: 'toast-bottom-right'
        });
      }).catch(error => {
        console.log(error);
      })
    }
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url], this.navigationExtras);
  }

  onGoEdit(item: any) {
    this.navigationExtras.state = item;
    this.router.navigate(['/admin/comunicacion/editarAnuncio'], this.navigationExtras);
  }
}

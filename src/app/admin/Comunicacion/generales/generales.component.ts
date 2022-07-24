import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AnunciosGeneralesService} from '../../../services/anunciosGenerales.service';
import {DialogService} from "../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";
import {audithService} from "../../../services/audith.service";

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})

export class GeneralesComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idCondominio: string = ''
  anunciosGenerales: any[] = [];
  myDate = new Date();

  constructor(
    private router: Router,
    private _anunciosGeneralesService: AnunciosGeneralesService,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private _auditService: audithService
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
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
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
    this.router.navigate(['/admin/comunicacion/nuevoAnuncio']);
  }

  onDelete(id: string) {

    this._dialogService.confirmDialog({
      title: 'Eliminar área',
      message: '¿Está seguro de eliminar el anuncio general?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this.audit(id);
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

  audit(id:any) {
    const datos: any = {
      modulo: 'Comunicacion',
      idUsuario: sessionStorage.getItem('idAdministrador'),
      accion: 'Eliminación Anuncio',
      fechaActualizacion: this.myDate,
    }
    this._auditService.saveAudith(datos);
  }

  onGoEdit(item: any) {
    sessionStorage.setItem('idAnuncioGeneral', <string>item.idAnuncioGeneral);
    this.router.navigate(['/admin/comunicacion/editarAnuncio']);
  }
}

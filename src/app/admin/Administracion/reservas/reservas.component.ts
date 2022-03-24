import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";
import {ReservasService} from "../../../services/reservas.service";
import {ToastrService} from "ngx-toastr";
import {DialogService} from "../../../services/dialog.service";

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAreaComunal: string = '';
  nombreAreaComunal: string = '';
  reservas: any[] = [];
  areaComunal: any[] = [];

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _reservaService: ReservasService,
    private toastr: ToastrService,
    private _dialogService: DialogService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.getReservas();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAreaComunal = navigations.idAreaComunal;
    this.nombreAreaComunal = navigations.nombre;
    this.areaComunal = navigations;
    this.NavigationExtras.state = this.areaComunal;
  }

  getReservas() {
    this.subscription.add(
      this._reservaService.getReserva(this.idAreaComunal).subscribe(data => {
        this.reservas = [];
        data.forEach((element: any) => {
          this.reservas.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/administracion/areasComunes'], this.NavigationExtras);
  }

  onGoCreate(): void {
    this.router.navigate(['/admin/administracion/reservasCreate'], this.NavigationExtras);
  }

  onDelete(id: string): void {
    this._dialogService.confirmDialog({
      title: 'Eliminar reserva',
      message: '¿Está seguro de eliminar la reserva?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        this._reservaService.eliminarReserva(id).then(() => {
          this.toastr.success('El registro fue eliminado con exito', 'Registro eliminado', {
            positionClass: 'toast-bottom-right'
          });
        }).catch(error => {
          console.log(error);
        })
      }
    })
  }

  onAcept(id: string) {
    this._dialogService.confirmDialog({
      title: 'Aceptar Reserva',
      message: '¿Está seguro de aceptar la reserva?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {

        const reserva: any = {
          estadoReserva: 'Aceptado',
        }

        this._reservaService.actualizarReserva(id, reserva).then(() => {
          this.toastr.success('La reserva fue actualizada con exito', 'Reserva actualizada', {
            positionClass: 'toast-bottom-rigth'
          });
        }).catch(error => {
          console.log(error);
        })
      }
    })
  }

  onDeny(id: string) {
    this._dialogService.confirmDialog({
      title: 'Aceptar Reserva',
      message: '¿Está seguro de rechazar la reserva?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {

        const reserva: any = {
          estadoReserva: 'Rechazado',
        }

        this._reservaService.actualizarReserva(id, reserva).then(() => {
          this.toastr.success('La reserva fue actualizada con exito', 'Reserva actualizada', {
            positionClass: 'toast-bottom-rigth'
          });
        }).catch(error => {
          console.log(error);
        })
      }
    })
  }

}

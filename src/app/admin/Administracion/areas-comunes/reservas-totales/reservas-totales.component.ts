import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommandModel, GridComponent, PageSettingsModel, PdfExportProperties, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { Query } from '@syncfusion/ej2-data';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-reservas-totales',
  templateUrl: './reservas-totales.component.html',
  styleUrls: ['./reservas-totales.component.css']
})
export class ReservasTotalesComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAreaComunal: string = '';
  idCondominio: string = '';
  reservas: any[] = [];

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public commands: CommandModel[];
  public queryClone: any;
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _reservaService: ReservasService,
    private toastr: ToastrService,
    private _dialogService: DialogService
  ) {
    this.pageSettings = { pageSize: 6 }
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [
      { title: 'Aceptar', buttonOption: { iconCss: 'e-icons e-circle-check', cssClass: 'e-success e-flat' } },
      { title: 'Rechazar', buttonOption: { iconCss: 'e-icons e-circle-close', cssClass: 'e-danger e-flat' } },
      //{ title: 'Editar', buttonOption: { iconCss: 'e-icons e-edit', cssClass: 'e-flat' } },
      { title: 'Eliminar', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } }
    ];

    this.recoverData();
  }

  ngOnInit(): void {
    this.getReservas();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idAreaComunal = <string>sessionStorage.getItem('idAreaComunal');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getReservas() {
    this.subscription.add(
      this._reservaService.getReservasEnCondominio(this.idCondominio).subscribe(data => {
        this.reservas = [];
        data.forEach((element: any) => {
          this.reservas.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onGoCreate() {
    this.router.navigate(['/admin/administracion/areasComunes/reservasCreate']);
  }

  //Seleccionar editar o eliminar usuario
  commandClick(item: any): void {
    const id = <string>item.rowData['idReserva'];
    if (item.target?.title === 'Aceptar') {
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

    } else if (item.target?.title === 'Rechazar') {

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
    } else if (item.target?.title === 'Editar') {

      sessionStorage.setItem('idReserva', <string>item.rowData['idReserva']);
      sessionStorage.setItem('idAreaComunal', <string>item.rowData['idAreaComunal']);
      sessionStorage.setItem('idUnidad', <string>item.rowData['idUnidad']);
      this.router.navigate(['/admin/administracion/areasComunes/reservasEdit']);

    } else if (item.target?.title === 'Eliminar') {

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
      });
    }
  }

  //Seleccionar exportar excel y pdf
  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'reservas.pdf'
      };
      this.queryClone = this.grid.query;
      this.grid.query = new Query().addParams('recordcount', '12');
      this.grid.pdfExport(pdfExportProperties);
      //this.grid.pdfExport();
    } else if (args.item.id === 'Grid_excelexport') {
      this.queryClone = this.grid.query;
      this.grid.query = new Query().addParams('recordcount', '12');
      this.grid.excelExport();
    }
  }

  pdfExportComplete(): void {
    this.grid.query = this.queryClone;
  }

  excelExportComplete(): void {
    this.grid.query = this.queryClone;
  }
}

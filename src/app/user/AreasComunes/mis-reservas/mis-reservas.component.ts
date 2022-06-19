import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommandModel, GridComponent, PageSettingsModel, PdfExportProperties, rowCell, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { Query } from '@syncfusion/ej2-data';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idUnidad: string = '';
  idCondominio: string = '';
  reservas: any[] = [];

  public pageSettings: PageSettingsModel;
  public editSettings: Object;
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

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', allowEditOnDblClick: false };

    this.commands = [
      {
        type: 'Delete', title: 'Cancelar reservación', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' }
      }
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
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getReservas() {
    this.subscription.add(
      this._reservaService.getReservasUsuario(this.idCondominio, this.idUnidad).subscribe(data => {
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

  commandClick(item: any): void {
    const id = <string>item.rowData['idReserva'];

    if (item.target?.title === 'Cancelar reservación') {
      this._dialogService.confirmDialog({
        title: 'Cancelar Reserva',
        message: '¿Está seguro de cancelar la reservación?',
        confirmText: 'Si',
        cancelText: 'No',
      }).subscribe(res => {
        if (res) {
          const reserva: any = {
            estadoReserva: 'Cancelado',
          }
          this._reservaService.actualizarReserva(id, reserva).then(() => {
            this.toastr.success('La reservación fue cancelada con exito', 'Registro eliminado', {
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

  //evento para buscar al coincidir una letra
  created(): void {
    document.getElementById(this.grid.element.id + "_searchbar")!.addEventListener('keyup', () => {
      this.grid.search((event!.target as HTMLInputElement).value)
    });
  }

}

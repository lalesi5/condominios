import {Component, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {
  CommandModel,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import {ReservasService} from "../../services/reservas.service";
import {UnidadesService} from "../../services/unidades.service";
import {IngresoUnidadesService} from "../../services/pagos.service";
import {DialogService} from "../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {Query} from "@syncfusion/ej2-data";

@Component({
  selector: 'app-finanzasUsuario',
  templateUrl: './finanzasUsuario.component.html',
  styleUrls: ['./finanzasUsuario.component.css']
})

export class FinanzasUsuarioComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idUnidad: string = '';
  reservas: any[] = [];
  unidad: any[] = [];
  ingresoUnidades: any [] = [];
  sumaValorReservas: number = 0;
  cuotaUnidad: number = 0;

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public queryClone: any;
  public commands: CommandModel[];
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _reservasService: ReservasService,
    private _unidadesService: UnidadesService,
    private _ingresoUnidadesService: IngresoUnidadesService,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.recoverData();
    this.pageSettings = {pageSize: 6}
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{ title: 'Anular Pago', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } }];
  }

  ngOnInit(): void {
    this.getValoresReservas();
    this.getUnidadCuotaReserva();
    this.getIngresoUnidades();
  }

  recoverData() {
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
  }

  getValoresReservas() {
    this.subscription.add(
      this._reservasService.getReservasValorPago(this.idUnidad).subscribe(data => {
        this.reservas = [];
        data.forEach((element: any) => {
          this.reservas.push({
            ...element.payload.doc.data()
          })
        })
        //suma todos los valores de reservas que pertenecen a esa unidad y que tienen pagoReserva = Por Pagar
        this.reservas.map(data => {
          this.sumaValorReservas += data.valorReserva;
        })
      })
    )
  }

  getUnidadCuotaReserva() {
    this.subscription.add(
      this._unidadesService.getUnidadesById(this.idUnidad).subscribe(data => {
        this.unidad = [];
        data.forEach((element: any) => {
          this.unidad.push({
            ...element.payload.doc.data()
          })
        })
        this.unidad.map(data => {
          this.cuotaUnidad = data.cuotaUnidad;
        })
      })
    )
  }

  getIngresoUnidades() {
    this.subscription.add(
      this._ingresoUnidadesService.getPagos(this.idUnidad).subscribe(data => {
        this.ingresoUnidades = [];
        data.forEach((element: any) => {
          this.ingresoUnidades.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }

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

  commandClick(item: any): void{
    if(item.target?.title == 'Anular Pago'){
      const id = <string>item.rowData['idPago'];
      this._dialogService.confirmDialog({
        title: 'Anular Pago',
        message: '¿Está seguro de anular el pago?',
        confirmText: 'Sí',
        cancelText: 'No'
      }).subscribe( res => {
        if (res) {
          const pagoMensualidad: any = {
            estadoIngreso: 'Inactivo'
          }
          this._ingresoUnidadesService.updatePago(id, pagoMensualidad).then(() => {
            this.toastr.success('El pago ha sido anulado con exito', 'Pago Anulado', {
              positionClass: 'toast-bottom-right'
            });
          }).catch(error => {
            console.log(error);
          })
        }
      })
    }
  }

  pdfExportComplete(): void {
    this.grid.query = this.queryClone;
  }

  excelExportComplete(): void {
    this.grid.query = this.queryClone;
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/finanzas/ingresosFinanzas']);
  }

}

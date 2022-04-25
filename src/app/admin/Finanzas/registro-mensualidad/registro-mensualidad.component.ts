import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {ReservasService} from "../../../services/reservas.service";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {UnidadesService} from "../../../services/unidades.service";
import {Router} from "@angular/router";
import {
  CommandModel,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import {Query} from "@syncfusion/ej2-data";
import {IngresoUnidadesService} from "../../../services/pagos.service";

@Component({
  selector: 'app-registro-mensualidad',
  templateUrl: './registro-mensualidad.component.html',
  styleUrls: ['./registro-mensualidad.component.css']
})
export class RegistroMensualidadComponent implements OnInit {

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
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _reservasService: ReservasService,
    private _unidadesService: UnidadesService,
    private _ingresoUnidadesService: IngresoUnidadesService
  ) {
    this.recoverData();
    this.pageSettings = {pageSize: 6}
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
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

  onGoCreate() {
    this.router.navigate(['/admin/finanzas/crearPagoMensualidad']);
    sessionStorage.setItem('idUnidad', <string>this.idUnidad);
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

  onBacktoList(): void {
    this.router.navigate(['/admin/finanzas/ingresosFinanzas']);
  }

}

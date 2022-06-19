import {Component, OnInit, ViewChild} from "@angular/core";
import {Subscription} from "rxjs";
import {
  CommandModel,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import {Router} from "@angular/router";
import {DialogService} from "../../../services/dialog.service";
import {IngresoUnidadesService} from "../../../services/pagos.service";
import {extraordinariosService} from "../../../services/extraordinarios.service";
import {Query} from "@syncfusion/ej2-data";

@Component({
  selector: 'app-ingresoReportes',
  templateUrl: 'ingresosReportes.component.html',
  styleUrls: ['./ingresosReportes.component.css']
})

export class IngresosReportesComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  ingresos: any[] = [];
  pagosExtraordinarios: any[] = [];
  sumaIngresos: number = 0;
  sumaExtraordinarios: number = 0;
  total: number = 0;

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public queryClone: any;
  public commands: CommandModel[];
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _ingresosService: IngresoUnidadesService,
    private _extraordinariosService: extraordinariosService,
    private _dialogService: DialogService
  ) {
    this.recoverData();
    this.pageSettings = {pageSize: 6}
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{title: 'Anular Egreso', buttonOption: {iconCss: 'e-icons e-delete', cssClass: 'e-flat'}}];
  }

  ngOnInit(): void {
    this.getIngresos();
    this.getPagosExtraordinarios()
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getIngresos() {
    this.subscription.add(
      this._ingresosService.getPagosCondominio(this.idCondominio).subscribe(data => {
        this.ingresos = [];
        data.forEach((element: any) => {
          if (element.payload.doc.data()['modoPago'] === 'Mensualidad' || element.payload.doc.data()['modoPago'] === 'Extraordinario') {
            this.ingresos.push({
              ...element.payload.doc.data()
            })
          }
        })
        this.sumaIngresos = 0;
        this.ingresos.map(data => {
          this.sumaIngresos += data.valorPago;
        })
      })
    )
  }

  getPagosExtraordinarios() {
    this.subscription.add(
      this._extraordinariosService.getExtraordinarios(this.idCondominio).subscribe(data => {
        this.pagosExtraordinarios = [];
        data.forEach((element: any) => {
          this.pagosExtraordinarios.push({
            ...element.payload.doc.data()
          })
        })
        this.sumaExtraordinarios = 0;
        this.total = 0;
        this.pagosExtraordinarios.map(data => {
          this.sumaExtraordinarios += data.valorPagoExtraordinario;
        })
        this.total = this.sumaExtraordinarios + this.sumaIngresos;
      })
    )
  }

  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'ingresosUnidades.pdf'
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

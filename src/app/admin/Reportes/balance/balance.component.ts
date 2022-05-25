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
import {IngresoUnidadesService} from "../../../services/pagos.service";
import {extraordinariosService} from "../../../services/extraordinarios.service";
import {DialogService} from "../../../services/dialog.service";
import {egresosService} from "../../../services/egresos.service";
import {Query} from "@syncfusion/ej2-data";

@Component({
  selector: 'app-balance',
  templateUrl: 'balance.component.html',
  styleUrls: ['./balance.component.css']
})

export class BalanceComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  ingresos: any[] = [];
  egresos: any[] = [];
  pagosExtraordinarios: any[] = [];
  sumaIngresos: number = 0;
  sumaExtraordinarios: number = 0;
  sumaEgresos: number = 0;
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
    private _dialogService: DialogService,
    private _egresoService: egresosService
  ) {
    this.recoverData();
    this.pageSettings = {pageSize: 6}
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{title: 'Anular Egreso', buttonOption: {iconCss: 'e-icons e-delete', cssClass: 'e-flat'}}];
  }

  ngOnInit() {
    this.getIngresos();
    this.getPagosExtraordinarios();
    this.getEgresos();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getEgresos() {
    this.subscription.add(
      this._egresoService.getEgresos(this.idCondominio).subscribe(data => {
        this.egresos = [];
        data.forEach((element: any) => {
          this.egresos.push({
            ...element.payload.doc.data()
          })
        })
        this.egresos.map(data => {
          this.sumaEgresos += data.valorEgreso;
        })
      })
    )
  }


  getIngresos() {
    this.subscription.add(
      this._ingresosService.getPagosCondominio(this.idCondominio).subscribe(data => {
        this.ingresos = [];
        data.forEach((element: any) => {
          this.ingresos.push({
            ...element.payload.doc.data()
          })
        })
        this.sumaIngresos = 0;
        this.ingresos.map(data => {
          this.sumaIngresos += data.valorTotal;
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

  unirPagos() {
    this.pagosExtraordinarios = this.pagosExtraordinarios.concat(this.ingresos, this.egresos);
    console.log(this.pagosExtraordinarios);
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

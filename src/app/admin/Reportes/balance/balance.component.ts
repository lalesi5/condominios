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
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";

@Component({
  selector: 'app-balance',
  templateUrl: 'balance.component.html',
  styleUrls: ['./balance.component.css']
})

export class BalanceComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  balance: any[] = [];
  ingresos: any[] = [];
  egresos: any[] = [];
  sumaIngresos: number = 0;
  sumaBalance: number = 0;
  sumaEgresos: number = 0;

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
    this.getBalance();
    this.getIngresos();
    this.getEgresos();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }


  getBalance() {
    this.subscription.add(
      this._ingresosService.getPagosCondominio(this.idCondominio).subscribe(data => {
        this.balance = [];
        data.forEach((element: any) => {
          this.balance.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
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

  getEgresos() {
    this.subscription.add(
      this._ingresosService.getPagosCondominio(this.idCondominio).subscribe(data => {
        this.egresos = [];
        data.forEach((element: any) => {
          if (element.payload.doc.data()['modoPago'] === 'Egreso') {
            this.egresos.push({
              ...element.payload.doc.data()
            })
          }
        })
        this.sumaEgresos = 0;
        this.egresos.map(data => {
          this.sumaEgresos += data.valorPago;
        })
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

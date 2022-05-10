import {Component, OnInit, ViewChild} from "@angular/core";
import {Subscription} from "rxjs";
import { AggregateService } from '@syncfusion/ej2-angular-grids';
import {
  CommandModel,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import {Router} from "@angular/router";
import {egresosService} from "../../../services/egresos.service";
import {DialogService} from "../../../services/dialog.service";
import {Query} from "@syncfusion/ej2-data";

@Component({
  selector: 'app-egresoReportes',
  templateUrl: 'egresosReportes.component.html',
  styleUrls: ['./egresosReportes.component.css'],
  providers: [AggregateService]
})

export class EgresosReportesComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  egresos: any[] = [];
  sumaEgresos: number = 0;

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public queryClone: any;
  public commands: CommandModel[];
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _egresoService: egresosService,
    private _dialogService: DialogService
  ) {
    this.recoverData();
    this.pageSettings = {pageSize: 6}
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{title: 'Anular Egreso', buttonOption: {iconCss: 'e-icons e-delete', cssClass: 'e-flat'}}];
  }

  ngOnInit(): void {
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

  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'egresos.pdf'
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

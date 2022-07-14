import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import {
  CommandModel,
  ExcelExportProperties,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import { Router } from "@angular/router";
import { IngresoUnidadesService } from "../../../services/pagos.service";
import { extraordinariosService } from "../../../services/extraordinarios.service";
import { DialogService } from "../../../services/dialog.service";
import { egresosService } from "../../../services/egresos.service";
import { Query } from "@syncfusion/ej2-data";
import { PdfStandardFont, PdfFontFamily, PdfFontStyle } from '@syncfusion/ej2-pdf-export';

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
    this.pageSettings = { pageSize: 6 }
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{ title: 'Anular Egreso', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } }];
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

  //Seleccionar exportar excel y pdf
  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        pageOrientation: 'Landscape',
        fileName: 'Reportes.pdf',
        theme: {
          header: {
            font: new PdfStandardFont(PdfFontFamily.TimesRoman, 11, PdfFontStyle.Bold)
          }
        },
        header: {
          fromTop: 0,
          height: 130,
          contents: [
            {
              type: 'Text',
              value: "CONDOMINIOS EPN - Historial de Movimientos",
              position: { x: 0, y: 50 },
              style: { textBrushColor: '#000000', fontSize: 20 }
            },
          ]
        },
        footer: {
          fromBottom: 160,
          height: 150,
          contents: [
            {
              type: 'PageNumber',
              pageNumberType: 'Arabic',
              format: 'Página {$current} de {$total}',
              position: { x: 0, y: 25 },
              style: { textBrushColor: '#000000', fontSize: 15 }
            }
          ]
        }
      }

      this.queryClone = this.grid.query;
      this.grid.query = new Query().addParams('recordcount', '12');
      this.grid.pdfExport(pdfExportProperties);
    } else if (args.item.id === 'Grid_excelexport') {
      const excelExportProperties: ExcelExportProperties = {
        fileName: 'Reportes.xlsx',
        header: {
          headerRows: 5,
          rows: [
            {
              cells: [{
                colSpan: 7, value: 'CONDOMINIOS EPN',
                style: { fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true, }
              }]
            },
            {
              cells: [{
                colSpan: 7, value: 'Historial de Movimientos',
                style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true, }
              }]
            },
            { cells: [{ colSpan: 7, hyperlink: { target: 'mailto:condominios.epn@gmail.com' }, style: { hAlign: 'Center' } }] },
          ]
        },
        footer: {
          footerRows: 3,
          rows: [
            { cells: [{ colSpan: 7, value: 'Información del Sistema de Gestion de Condominios!', style: { hAlign: 'Center', bold: true } }] }
          ]
        },
      };
      this.queryClone = this.grid.query;
      this.grid.query = new Query().addParams('recordcount', '12');
      this.grid.excelExport(excelExportProperties);
    }
  }

  pdfExportComplete(): void {
    this.grid.query = this.queryClone;
  }

  excelExportComplete(): void {
    this.grid.query = this.queryClone;
  }
}

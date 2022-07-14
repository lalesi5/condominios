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
import { DialogService } from "../../../services/dialog.service";
import { IngresoUnidadesService } from "../../../services/pagos.service";
import { extraordinariosService } from "../../../services/extraordinarios.service";
import { Query } from "@syncfusion/ej2-data";
import { PdfStandardFont, PdfFontFamily, PdfFontStyle } from '@syncfusion/ej2-pdf-export';

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
    this.pageSettings = { pageSize: 6 }
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{ title: 'Anular Egreso', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } }];
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

  //Seleccionar exportar excel y pdf
  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        pageOrientation: 'Landscape',
        fileName: 'Ingresos.pdf',
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
              value: "CONDOMINIOS EPN - Ingresos",
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
        fileName: 'Ingresos.xlsx',
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
                colSpan: 7, value: 'Ingresos',
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

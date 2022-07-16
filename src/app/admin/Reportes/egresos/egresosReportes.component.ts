import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { AggregateService, ExcelExportProperties } from '@syncfusion/ej2-angular-grids';
import {
  CommandModel,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import { Router } from "@angular/router";
import { DialogService } from "../../../services/dialog.service";
import { Query } from "@syncfusion/ej2-data";
import { IngresoUnidadesService } from "../../../services/pagos.service";
import { PdfStandardFont, PdfFontFamily, PdfFontStyle } from '@syncfusion/ej2-pdf-export';

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
    private _egresoService: IngresoUnidadesService,
    private _dialogService: DialogService
  ) {
    this.recoverData();
    this.pageSettings = { pageSize: 6 }
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{ title: 'Anular Egreso', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } }];
  }

  ngOnInit(): void {
    this.getEgresos();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getEgresos() {
    this.subscription.add(
      this._egresoService.getPagosCondominio(this.idCondominio).subscribe(data => {
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
        fileName: 'Egresos.pdf',
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
              value: "CONDOMINIOS EPN - Egresos",
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
        fileName: 'Egresos.xlsx',
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
                colSpan: 7, value: 'Egresos',
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
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { IngresoUnidadesService } from "../../../services/pagos.service";
import {
  CommandModel,
  ExcelExportProperties,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import { Query } from "@syncfusion/ej2-data";
import { PdfStandardFont, PdfFontFamily, PdfFontStyle } from '@syncfusion/ej2-pdf-export';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cuentas-selected',
  templateUrl: './cuentas-selected.component.html',
  styleUrls: ['./cuentas-selected.component.css']
})
export class CuentasSelectedComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  idCuenta: string = '';
  nombreCuenta: string = '';
  fechaInicio: number = 0;
  fechaFin: number = 0;
  cuenta: any[] = [];
  timestamp = new Date();
  pipe = new DatePipe('en-US');

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public queryClone: any;
  public commands: CommandModel[];
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _cuentasService: IngresoUnidadesService,
  ) {
    this.recoverData();
    this.pageSettings = { pageSize: 6 }
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{ title: 'Anular Egreso', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } }];
  }

  ngOnInit(): void {
    this.getCuentasFechaRango();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idCuenta = <string>sessionStorage.getItem('idCuenta');
    // @ts-ignore
    this.fechaInicio = sessionStorage.getItem('fechaInicio')
    // @ts-ignore
    this.fechaFin = sessionStorage.getItem('fechaFin')
  }

  getCuentasFechaRango() {
    this.subscription.add(
      this._cuentasService.getPagosCondominioCuenta(this.idCondominio, this.idCuenta).subscribe(data => {
        this.cuenta = [];
        this.fechaInicio = parseInt(String(this.fechaInicio));
        this.fechaFin = parseInt(String(this.fechaFin));
        data.forEach((element: any) => {
          this.nombreCuenta = element.payload.doc.data()['nombreCuenta'];
          //console.log(typeof (Date.parse(element.payload.doc.data()['fechaReciboPago'])));
          //console.log(typeof (this.fechaInicio));
          if (Date.parse(element.payload.doc.data()['fechaReciboPago']) >= this.fechaInicio && Date.parse(element.payload.doc.data()['fechaReciboPago']) <= this.fechaFin) {
            this.cuenta.push({
              ...element.payload.doc.data()
            })
          }
        })
        //console.log(this.cuenta);
      })
    )
  }

  //Seleccionar exportar excel y pdf
  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        pageOrientation: 'Landscape',
        fileName: 'CuentaPorFecha.pdf',
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
              value: "CONDOMINIOS EPN - Cuenta por Fecha: " + this.pipe.transform(this.fechaInicio, 'yyyy/MM/dd')
                + " - " + this.pipe.transform(this.fechaFin, 'yyyy/MM/dd') + "\n" + "\n" + "CUENTA: " + this.nombreCuenta,
              position: { x: 0, y: 50 },
              style: { textBrushColor: '#000000', fontSize: 20 }
            }
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
        fileName: 'CuentaPorFecha.xlsx',
        header: {
          headerRows: 6,
          rows: [
            {
              cells: [{
                colSpan: 7, value: 'CONDOMINIOS EPN',
                style: { fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true, }
              }]
            },
            {
              cells: [{
                colSpan: 7, value: 'Cuenta por Fecha: ' + this.pipe.transform(this.fechaInicio, 'yyyy/MM/dd')
                  + " - " + this.pipe.transform(this.fechaFin, 'yyyy/MM/dd'),
                style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true, }
              }]
            },
            {
              cells: [{
                colSpan: 7, value: 'CUENTA: ' + this.nombreCuenta,
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

  onBacktoList(): void {
    this.router.navigate(['admin/reportes/cuentasFecha']);
  }
}
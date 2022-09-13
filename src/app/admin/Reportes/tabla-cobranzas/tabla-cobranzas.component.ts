import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {
  CommandModel,
  ExcelExportProperties,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import {Router} from "@angular/router";
import {CuentasService} from "../../../services/cuentas.service";
import {DialogService} from "../../../services/dialog.service";
import {UnidadesService} from "../../../services/unidades.service";
import {Query} from "@syncfusion/ej2-data";
import {TablaCobranzaService} from "../../../services/tablaCobranza.service";
import {PdfStandardFont, PdfFontFamily, PdfFontStyle} from '@syncfusion/ej2-pdf-export';
import {QueryCellInfoEventArgs} from '@syncfusion/ej2-grids';

@Component({
  selector: 'app-tabla-cobranzas',
  templateUrl: './tabla-cobranzas.component.html',
  styleUrls: ['./tabla-cobranzas.component.css']
})
export class TablaCobranzasComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  tablaCobranzas: any[] = [];


  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public queryClone: any;
  public commands: CommandModel[];
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _tablaCobranzas: TablaCobranzaService,
    private _dialogService: DialogService,
  ) {
    this.recoverData();
    this.pageSettings = {pageSize: 6}
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{title: 'Seleccionar', buttonOption: {iconCss: 'e-icons e-eye', cssClass: 'e-flat'}}];
  }

  ngOnInit(): void {
    this.getTablaCobranzas();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getTablaCobranzas() {
    this.subscription.add(
      this._tablaCobranzas.getTablaCobranzasByCondominio(this.idCondominio).subscribe(data => {
        this.tablaCobranzas = [];
        data.forEach((element: any) => {
          this.tablaCobranzas.push({
            ...element.payload.doc.data(),
          })
        })
      })
    )
  }

  customiseCell(args: QueryCellInfoEventArgs) {

    // @ts-ignore
    if (args.column.field === 'junio2022') {
      // @ts-ignore
      if (args.data['junio2022'] > 150) {
        (args.cell as any).style.backgroundColor = "red";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['junio2022'] > 0 && args.data['junio2022'] <=150 ) {
        (args.cell as any).style.backgroundColor = "orange";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['junio2022'] === 0) {
        (args.cell as any).style.backgroundColor = "green";
        (args.cell as any).style.color = "white";
      }
    }

    // @ts-ignore
    if (args.column.field === 'julio2022') {
      // @ts-ignore
      if (args.data['julio2022'] > 150) {
        (args.cell as any).style.backgroundColor = "red";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['julio2022'] > 0 && args.data['julio2022'] <=150 ) {
        (args.cell as any).style.backgroundColor = "orange";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['julio2022'] === 0) {
        (args.cell as any).style.backgroundColor = "green";
        (args.cell as any).style.color = "white";
      }
    }

    // @ts-ignore
    if (args.column.field === 'agosto2022') {
      // @ts-ignore
      if (args.data['agosto2022'] > 150) {
        (args.cell as any).style.backgroundColor = "red";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['agosto2022'] > 0 && args.data['agosto2022'] <=150 ) {
        (args.cell as any).style.backgroundColor = "orange";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['agosto2022'] === 0) {
        (args.cell as any).style.backgroundColor = "green";
        (args.cell as any).style.color = "white";
      }
    }

    // @ts-ignore
    if (args.column.field === 'septiembre2022') {
      // @ts-ignore
      if (args.data['septiembre2022'] > 150) {
        (args.cell as any).style.backgroundColor = "red";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['septiembre2022'] > 0 && args.data['septiembre2022'] <=150 ) {
        (args.cell as any).style.backgroundColor = "orange";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['septiembre2022'] === 0) {
        (args.cell as any).style.backgroundColor = "green";
        (args.cell as any).style.color = "white";
      }
    }

    // @ts-ignore
    if (args.column.field === 'octubre2022') {
      // @ts-ignore
      if (args.data['octubre2022'] > 150) {
        (args.cell as any).style.backgroundColor = "red";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['octubre2022'] > 0 && args.data['octubre2022'] <=150 ) {
        (args.cell as any).style.backgroundColor = "orange";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['octubre2022'] === 0) {
        (args.cell as any).style.backgroundColor = "green";
        (args.cell as any).style.color = "white";
      }
    }

    // @ts-ignore
    if (args.column.field === 'noviembre2022') {
      // @ts-ignore
      if (args.data['noviembre2022'] > 150) {
        (args.cell as any).style.backgroundColor = "red";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['noviembre2022'] > 0 && args.data['noviembre2022'] <=150 ) {
        (args.cell as any).style.backgroundColor = "orange";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['noviembre2022'] === 0) {
        (args.cell as any).style.backgroundColor = "green";
        (args.cell as any).style.color = "white";
      }
    }

    // @ts-ignore
    if (args.column.field === 'diciembre2022') {
      // @ts-ignore
      if (args.data['diciembre2022'] > 150) {
        (args.cell as any).style.backgroundColor = "red";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['diciembre2022'] > 0 && args.data['diciembre2022'] <=150 ) {
        (args.cell as any).style.backgroundColor = "orange";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['diciembre2022'] === 0) {
        (args.cell as any).style.backgroundColor = "green";
        (args.cell as any).style.color = "white";
      }
    }

    // @ts-ignore
    if (args.column.field === 'enero2023') {
      // @ts-ignore
      if (args.data['enero2023'] > 150) {
        (args.cell as any).style.backgroundColor = "red";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['enero2023'] > 0 && args.data['enero2023'] <=150 ) {
        (args.cell as any).style.backgroundColor = "orange";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['enero2023'] === 0) {
        (args.cell as any).style.backgroundColor = "green";
        (args.cell as any).style.color = "white";
      }
    }

    // @ts-ignore
    if (args.column.field === 'febrero2023') {
      // @ts-ignore
      if (args.data['febrero2023'] > 150) {
        (args.cell as any).style.backgroundColor = "red";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['febrero2023'] > 0 && args.data['febrero2023'] <=150 ) {
        (args.cell as any).style.backgroundColor = "orange";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['febrero2023'] === 0) {
        (args.cell as any).style.backgroundColor = "green";
        (args.cell as any).style.color = "white";
      }
    }

    // @ts-ignore
    if (args.column.field === 'marzo2023') {
      // @ts-ignore
      if (args.data['marzo2023'] > 150) {
        (args.cell as any).style.backgroundColor = "red";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['marzo2023'] > 0 && args.data['marzo2023'] <=150 ) {
        (args.cell as any).style.backgroundColor = "orange";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['marzo2023'] === 0) {
        (args.cell as any).style.backgroundColor = "green";
        (args.cell as any).style.color = "white";
      }
    }

    // @ts-ignore
    if (args.column.field === 'abril2023') {
      // @ts-ignore
      if (args.data['abril2023'] > 150) {
        (args.cell as any).style.backgroundColor = "red";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['abril2023'] > 0 && args.data['abril2023'] <=150 ) {
        (args.cell as any).style.backgroundColor = "orange";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['abril2023'] === 0) {
        (args.cell as any).style.backgroundColor = "green";
        (args.cell as any).style.color = "white";
      }
    }

    // @ts-ignore
    if (args.column.field === 'mayo2023') {
      // @ts-ignore
      if (args.data['mayo2023'] > 150) {
        (args.cell as any).style.backgroundColor = "red";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['mayo2023'] > 0 && args.data['mayo2023'] <=150 ) {
        (args.cell as any).style.backgroundColor = "orange";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['mayo2023'] === 0) {
        (args.cell as any).style.backgroundColor = "green";
        (args.cell as any).style.color = "white";
      }
    }

    // @ts-ignore
    if (args.column.field === 'junio2023') {
      // @ts-ignore
      if (args.data['junio2023'] > 150) {
        (args.cell as any).style.backgroundColor = "red";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['junio2023'] > 0 && args.data['junio2023'] <=150 ) {
        (args.cell as any).style.backgroundColor = "orange";
        (args.cell as any).style.color = "white";
      }
      // @ts-ignore
      else if(args.data['junio2023'] === 0) {
        (args.cell as any).style.backgroundColor = "green";
        (args.cell as any).style.color = "white";
      }
    }
  }


  //Seleccionar exportar excel y pdf
  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        pageOrientation: 'Landscape',
        fileName: 'TablaDeCobranza.pdf',
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
              value: "CONDOMINIOS EPN - Tabla de Cobranza",
              position: {x: 0, y: 50},
              style: {textBrushColor: '#000000', fontSize: 20}
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
              position: {x: 0, y: 25},
              style: {textBrushColor: '#000000', fontSize: 15}
            }
          ]
        }
      }

      this.queryClone = this.grid.query;
      this.grid.query = new Query().addParams('recordcount', '12');
      this.grid.pdfExport(pdfExportProperties);
    } else if (args.item.id === 'Grid_excelexport') {
      const excelExportProperties: ExcelExportProperties = {
        fileName: 'TablaDeCobranza.xlsx',
        header: {
          headerRows: 5,
          rows: [
            {
              cells: [{
                colSpan: 14, value: 'CONDOMINIOS EPN',
                style: {fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true,}
              }]
            },
            {
              cells: [{
                colSpan: 14, value: 'Tabla de Cobranza',
                style: {fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true,}
              }]
            },
            {
              cells: [{
                colSpan: 14,
                hyperlink: {target: 'mailto:condominios.epn@gmail.com'},
                style: {hAlign: 'Center'}
              }]
            },
          ]
        },
        footer: {
          footerRows: 3,
          rows: [
            {
              cells: [{
                colSpan: 14,
                value: 'Información del Sistema de Gestion de Condominios!',
                style: {hAlign: 'Center', bold: true}
              }]
            }
          ]
        },
      };
      this.queryClone = this.grid.query;
      this.grid.query = new Query().addParams('recordcount', '12');
      this.grid.excelExport(excelExportProperties);
    }
  }

  created(): void {
    document.getElementById(this.grid.element.id + "_searchbar")!.addEventListener('keyup', () => {
      this.grid.search((event!.target as HTMLInputElement).value)
    });
  }

  pdfExportComplete(): void {
    this.grid.query = this.queryClone;
  }

  excelExportComplete(): void {
    this.grid.query = this.queryClone;
  }

}

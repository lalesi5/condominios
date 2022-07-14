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
import { ToastrService } from "ngx-toastr";
import { Query } from "@syncfusion/ej2-data";
import { IngresoUnidadesService } from "../../../services/pagos.service";
import { PdfStandardFont, PdfFontFamily, PdfFontStyle } from '@syncfusion/ej2-pdf-export';

@Component({
  selector: 'app-egresosFinanzas',
  templateUrl: './egresosFinanzas.component.html',
  styleUrls: ['./egresosFinanzas.component.css']
})

export class EgresosFinanzasComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  egresos: any[] = [];

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public queryClone: any;
  public commands: CommandModel[];
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _egresos: IngresoUnidadesService,
    private _dialogService: DialogService,
    private toastr: ToastrService
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
      this._egresos.getEgresos(this.idCondominio).subscribe(data => {
        this.egresos = [];
        data.forEach((element: any) => {
          this.egresos.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }

  onGoCreate() {
    this.router.navigate(['/admin/finanzas/registroEgresos']);
    sessionStorage.setItem('idCondominio', <string>this.idCondominio);
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
              value: "CONDOMINIOS EPN - Lista de Egresos",
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
                colSpan: 6, value: 'CONDOMINIOS EPN',
                style: { fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true, }
              }]
            },
            {
              cells: [{
                colSpan: 6, value: 'Lista de Egresos',
                style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true, }
              }]
            },
            { cells: [{ colSpan: 6, hyperlink: { target: 'mailto:condominios.epn@gmail.com' }, style: { hAlign: 'Center' } }] },
          ]
        },
        footer: {
          footerRows: 3,
          rows: [
            { cells: [{ colSpan: 6, value: 'Información del Sistema de Gestion de Condominios!', style: { hAlign: 'Center', bold: true } }] }
          ]
        },
      };
      this.queryClone = this.grid.query;
      this.grid.query = new Query().addParams('recordcount', '12');
      this.grid.excelExport(excelExportProperties);
    }
  }

  commandClick(item: any): void {
    if (item.target?.title == 'Anular Egreso') {
      const id = <string>item.rowData['idPago'];
      this._dialogService.confirmDialog({
        title: 'Anular Egreso',
        message: '¿Está seguro de anular el egreso?',
        confirmText: 'Sí',
        cancelText: 'No'
      }).subscribe(res => {
        if (res) {
          const egreso: any = {
            estadoIngreso: 'Inactivo'
          }
          this._egresos.updatePago(id, egreso).then(() => {
            this.toastr.success('El egreso ha sido anulado con exito', 'Egreso Anulado', {
              positionClass: 'toast-bottom-right'
            });
          }).catch(error => {
            console.log(error);
          })
        }
      })
    }
  }

  pdfExportComplete(): void {
    this.grid.query = this.queryClone;
  }

  excelExportComplete(): void {
    this.grid.query = this.queryClone;
  }

  //evento para buscar al coincidir una letra
  created(): void {
    document.getElementById(this.grid.element.id + "_searchbar")!.addEventListener('keyup', () => {
      this.grid.search((event!.target as HTMLInputElement).value)
    });
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import {
  CommandModel,
  ExcelExportProperties,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import { PdfStandardFont, PdfFontFamily, PdfFontStyle } from '@syncfusion/ej2-pdf-export';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "../../../services/dialog.service";
import { UnidadesService } from "../../../services/unidades.service";
import { Query } from "@syncfusion/ej2-data";

@Component({
  selector: 'app-ajustes-listar-unidades',
  templateUrl: './ajustes-listar-unidades.component.html',
  styleUrls: ['./ajustes-listar-unidades.component.css']
})
export class AjustesListarUnidadesComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idCondominio: string = ''
  unidades: any[] = [];

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public commands: CommandModel[];
  public queryClone: any;
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
    private toastr: ToastrService,
    private _dialogService: DialogService,
  ) {
    this.pageSettings = { pageSize: 6 }
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{ title: 'Editar', buttonOption: { iconCss: 'e-icons e-edit', cssClass: 'e-flat' } },
    { title: 'Eliminar', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } }];
    this.recoverData();
  }

  ngOnInit(): void {
    this.getUnidades();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getUnidades() {
    try {
      this.subscription.add(
        this._unidadesService
          .getAllUnidades(this.idCondominio)
          .subscribe(data => {
            this.unidades = [];
            data.forEach((element: any) => {
              this.unidades.push({
                id: element.payload.doc.id,
                ...element.payload.doc.data()
              })
            })
          })
      )
    } catch (err) {
      console.log(err);
    }
  }

  commandClick(item: any): void {
    if (item.target?.title === 'Editar') {
      sessionStorage.setItem('idUnidad', <string>item.rowData['idUnidad']);
      this.router.navigate(['/admin/ajustes/ajustesUnidadesEdit']);

    } else if (item.target?.title === 'Eliminar') {
      const id = <string>item.rowData['idUnidad'];
      const idUser = <string>item.rowData['idUsuario'];
      this._dialogService.confirmDialog({
        title: 'Eliminar unidad',
        message: '¿Está seguro de eliminar la unidad?',
        confirmText: 'Si',
        cancelText: 'No',
      }).subscribe(res => {
        if (res) {

          this._unidadesService.deleteUnidades(id, idUser).then(() => {
            this.toastr.success('La unidad fue eliminado con exito', 'Registro eliminado', {
              positionClass: 'toast-bottom-right'
            });
          }).catch(error => {
            console.log(error);
          })
        }
      });
    }
  }


  onGoCreate() {
    this.router.navigate(['/admin/ajustes/ajustesUnidadesSelectUser']);
  }

  //Seleccionar exportar excel y pdf
  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'Unidades.pdf',
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
              value: "CONDOMINIOS EPN - Información de Unidades",
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
        fileName: 'Unidades.xlsx',
        header: {
          headerRows: 5,
          rows: [
            {
              cells: [{
                colSpan: 5, value: 'CONDOMINIOS EPN',
                style: { fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true, }
              }]
            },
            {
              cells: [{
                colSpan: 5, value: 'Información de Unidades',
                style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true, }
              }]
            },
            { cells: [{ colSpan: 5, hyperlink: { target: 'mailto:condominios.epn@gmail.com' }, style: { hAlign: 'Center' } }] },
          ]
        },
        footer: {
          footerRows: 3,
          rows: [
            { cells: [{ colSpan: 5, value: 'Información del Sistema de Gestion de Condominios!', style: { hAlign: 'Center', bold: true } }] }
          ]
        },
      };
      this.queryClone = this.grid.query;
      this.grid.query = new Query().addParams('recordcount', '12');
      this.grid.excelExport(excelExportProperties);
    }
  }

  pdfExportComplete()
    :
    void {
    this.grid.query = this.queryClone;
  }

  excelExportComplete()
    :
    void {
    this.grid.query = this.queryClone;
  }

  rowDataBound(args
    :
    any
  ) {
    // aquí estamos calculando el número de serie
    var rowIndex = parseInt(args.row.getAttribute('aria-rowIndex'));
    var page = this.grid.pageSettings.currentPage! - 1;

    var totalPages = this.grid.pageSettings.pageSize;
    var startIndex = page * totalPages!;
    var sno = startIndex + (rowIndex + 1);
    //  actualizando el valor en la primera celda de la fila donde hemos representado una columna vacía para esto
    args.row.cells[0].innerText = sno;
  }

  //evento para buscar al coincidir una letra
  created(): void {
    document.getElementById(this.grid.element.id + "_searchbar")!.addEventListener('keyup', () => {
      this.grid.search((event!.target as HTMLInputElement).value)
    });
  }
}

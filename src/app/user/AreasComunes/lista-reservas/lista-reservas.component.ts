import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelExportProperties, GridComponent, PageSettingsModel, PdfExportProperties, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { Query } from '@syncfusion/ej2-data';
import { PdfStandardFont, PdfFontFamily, PdfFontStyle } from '@syncfusion/ej2-pdf-export';

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css']
})
export class ListaReservasComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idUnidad: string = '';
  idCondominio: string = '';
  reservas: any[] = [];

  public pageSettings: PageSettingsModel;
  public editSettings: Object;
  public toolbarOptions: ToolbarItems[];
  public queryClone: any;
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _reservaService: ReservasService,
    private toastr: ToastrService,
    private _dialogService: DialogService
  ) {
    this.pageSettings = { pageSize: 6 }
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', allowEditOnDblClick: false };

    this.recoverData();
  }

  ngOnInit(): void {
    this.getReservas();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getReservas() {
    this.subscription.add(
      this._reservaService.getTodasReservasUsuario(this.idCondominio, this.idUnidad).subscribe(data => {
        this.reservas = [];
        data.forEach((element: any) => {
          this.reservas.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onGoCreate() {
    this.router.navigate(['/admin/administracion/areasComunes/reservasCreate']);
  }

  //Seleccionar exportar excel y pdf
  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        pageOrientation: 'Landscape',
        fileName: 'Reservas.pdf',
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
              value: "CONDOMINIOS EPN - Lista de Reservas",
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
        fileName: 'Reservas.xlsx',
        header: {
          headerRows: 5,
          rows: [
            {
              cells: [{
                colSpan: 4, value: 'CONDOMINIOS EPN',
                style: { fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true, }
              }]
            },
            {
              cells: [{
                colSpan: 4, value: 'Lista de Reservas',
                style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true, }
              }]
            },
            { cells: [{ colSpan: 4, hyperlink: { target: 'mailto:condominios.epn@gmail.com' }, style: { hAlign: 'Center' } }] },
          ]
        },
        footer: {
          footerRows: 3,
          rows: [
            { cells: [{ colSpan: 4, value: 'Información del Sistema de Gestion de Condominios!', style: { hAlign: 'Center', bold: true } }] }
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

  //evento para buscar al coincidir una letra
  created(): void {
    document.getElementById(this.grid.element.id + "_searchbar")!.addEventListener('keyup', () => {
      this.grid.search((event!.target as HTMLInputElement).value)
    });
  }

}

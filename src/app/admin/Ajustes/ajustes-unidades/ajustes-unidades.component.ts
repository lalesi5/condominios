import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommandModel, ExcelExportProperties, GridComponent, PageSettingsModel, PdfExportProperties, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { UnidadesService } from "../../../services/unidades.service";
import { Query } from '@syncfusion/ej2-data';
import { PdfStandardFont, PdfFontFamily, PdfFontStyle } from '@syncfusion/ej2-pdf-export';


@Component({
  selector: 'app-ajustes-unidades',
  templateUrl: './ajustes-unidades.component.html',
  styleUrls: ['./ajustes-unidades.component.css']
})
export class AjustesUnidadesComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  idUsuario: string = '';
  usuario: any[] = [];
  unidades: any[] = [];
  condominio: any[] = [];
  nombreResidente: string = '';
  apellidoResidente: string = '';

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public commands: CommandModel[];
  public queryClone: any;
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
    private toastr: ToastrService,
    private _dialogService: DialogService
  ) {
    this.pageSettings = { pageSize: 6 }

    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{ title: 'Editar', buttonOption: { iconCss: 'e-icons e-edit', cssClass: 'e-flat' } },
    { title: 'Eliminar', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } }];
    this.recoverData();
  }

  ngOnInit(): void {
    this.getDatosUnidades();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idAministrador = <string>sessionStorage.getItem('idAministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idUsuario = <string>sessionStorage.getItem('idUsuario');
    this.nombreResidente = <string>sessionStorage.getItem('nombreResidente');
    this.apellidoResidente = <string>sessionStorage.getItem('apellidoResidente');    
  }

  getDatosUnidades() {
    this.subscription.add(
      this._unidadesService.getAllUnidadesIdUser(this.idUsuario).subscribe(data => {
        this.unidades = [];
        data.forEach((element: any) => {
          this.unidades.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onGoCreate() {
    this.router.navigate(['/admin/ajustes/ajustesUnidadesCreate']);
  }

  //Seleccionar editar o eliminar usuario
  commandClick(args: any): void {
    if (args.target?.title === 'Editar') {
      sessionStorage.setItem('idUnidad', <string>args.rowData['idUnidad']);
      this.router.navigate(['/admin/ajustes/ajustesUnidadesEdit']);
    } else if (args.target?.title === 'Eliminar') {
      const id = <string>args.rowData['idUnidad'];
      this._dialogService.confirmDialog({
        title: 'Eliminar Unidad',
        message: '¿Está seguro de eliminar la información?',
        confirmText: 'Si',
        cancelText: 'No',
      }).subscribe(res => {
        if (res) {
          this._unidadesService.deleteUnidades(id).then(() => {
            this.toastr.success('El registro fue eliminado con exito', 'Registro eliminado', {
              positionClass: 'toast-bottom-right'
            });
          }).catch(error => {
            console.log(error);
          })
        }
      });
    }
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesUnidadesSelectUser']);
  }

  //Seleccionar exportar excel y pdf
  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'UnidadesPorUsuario.pdf',
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
              value: "CONDOMINIOS EPN - Lista de Unidades por Usuario",
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
        fileName: 'UnidadesPorUsuario.xlsx',
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
                colSpan: 5, value: 'Lista de Unidades por Usuario',
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
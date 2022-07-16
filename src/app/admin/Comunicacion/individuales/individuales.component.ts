import {Component, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {UnidadesService} from '../../../services/unidades.service';
import {Subscription} from "rxjs";
import {Query} from '@syncfusion/ej2-data';
import {
  CommandModel,
  ExcelExportProperties,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import { PdfStandardFont, PdfFontFamily, PdfFontStyle } from '@syncfusion/ej2-pdf-export';

@Component({
  selector: 'app-individuales',
  templateUrl: './individuales.component.html',
  styleUrls: ['./individuales.component.css']
})

export class IndividualesComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  unidades: any[] = [];

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public commands: CommandModel[];
  public queryClone: any;
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService
  ) {
    this.pageSettings = {pageSize: 6}
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{title: 'Ver Mensajes', buttonOption: {iconCss: 'e-icons e-comments', cssClass: 'e-flat'}},
      {title: 'Crear Nuevo', buttonOption: {iconCss: 'e-icons e-add', cssClass: 'e-flat'}}];
    this.recoverData();
  }

  ngOnInit() {
    this.getUnidades();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getUnidades() {
    this.subscription.add(
      this._unidadesService
        .getAllUnidadesOrdenadas(this.idCondominio)
        .subscribe(data => {
          this.unidades = [];
          data.forEach((element: any) => {
            this.unidades.push({
              ...element.payload.doc.data()
            })
          })
        })
    )
  }

  //Seleccionar editar o eliminar usuario
  commandClick(item: any): void {
    if (item.target?.title === 'Ver Mensajes') {
      sessionStorage.setItem('idUnidad', <string>item.rowData['idUnidad']);
      sessionStorage.setItem('idUsuario', <string>item.rowData['idUsuario']);
      sessionStorage.setItem('nombreResidente', <string>item.rowData['nombreResidente']);
      sessionStorage.setItem('apellidoResidente', <string>item.rowData['apellidoResidente']);
      this.router.navigate(['/admin/comunicacion/mensajeUsuario']);
    } else if (item.target?.title === 'Crear Nuevo') {
      sessionStorage.setItem('idUnidad', <string>item.rowData['idUnidad']);
      this.router.navigate(['/admin/comunicacion/nuevoMensaje']);
    }
  }

  onGoMensajesUsuarios(item: any) {
    sessionStorage.setItem('idUnidad', <string>item.idUnidad);
    sessionStorage.setItem('idUsuario', <string>item.idUsuario);
    sessionStorage.setItem('nombreResidente', <string>item.nombreResidente);
    sessionStorage.setItem('apellidoResidente', <string>item.apellidoResidente);
    this.router.navigate(['/admin/comunicacion/mensajeUsuario']);
  }

  onGoNuevoMensaje(item: any) {
    sessionStorage.setItem('idUnidad', <string>item.idUnidad);
    this.router.navigate(['/admin/comunicacion/nuevoMensaje']);
  }

  //Seleccionar exportar excel y pdf
  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'ListaUsuariosComunicadosIndividuales.pdf',
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
              value: "CONDOMINIOS EPN - Lista de Usuarios - Comunicados Individuales",
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
        fileName: 'ListaUsuariosComunicadosIndividuales.xlsx',
        header: {
          headerRows: 5,
          rows: [
            {
              cells: [{
                colSpan: 3, value: 'CONDOMINIOS EPN',
                style: { fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true, }
              }]
            },
            {
              cells: [{
                colSpan: 3, value: 'Lista de Usuarios - Comunicados Individuales',
                style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true, }
              }]
            },
            { cells: [{ colSpan: 3, hyperlink: { target: 'mailto:condominios.epn@gmail.com' }, style: { hAlign: 'Center' } }] },
          ]
        },
        footer: {
          footerRows: 3,
          rows: [
            { cells: [{ colSpan: 3, value: 'Información del Sistema de Gestion de Condominios!', style: { hAlign: 'Center', bold: true } }] }
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

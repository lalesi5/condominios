import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UnidadesService } from "src/app/services/unidades.service";
import { ClickEventArgs } from '@syncfusion/ej2-navigations'
import {
  CommandModel,
  ExcelExportService,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  PdfExportService,
  ToolbarItems,
  ToolbarService,
  VirtualScrollService
} from "@syncfusion/ej2-angular-grids";
import { Query } from '@syncfusion/ej2-data';
import { L10n, setCulture } from '@syncfusion/ej2-base';

L10n.load({
  'es': {
    grid: {
      "EmptyRecord": "No hay registros que mostrar",
      "InvalidFilterMessage": "Datos de filtro no válidos",
      "Print": "Impresión",
      "Pdfexport": "Exportar PDF",
      "Excelexport": "Exportar Excel",
      "Wordexport": "Exportación de palabras",
      "Search": "Buscar",
      "Columnchooser": "Columnas",
      "Item": "registro",
      "Items": "registros",
      "Matchs": "No se encontraron coincidencias",
      "ChooseDate": "Elige una fecha",
      "EnterValue": "Ingrese el valor",
      "Export": "Exportar",
      "FirstPage": "Primera página",
      "LastPage": "Última página",
      "PreviousPage": "Pagina anterior",
      "NextPage": "Siguiente página",
      "SortAscending": "Orden ascendente",
      "SortDescending": "Orden descendiente",
      "FilterMenu": "Filtrar",
      "SelectAll": "Seleccionar todo",
      "NoResult": "No se encontraron coincidencias",
      "DateFilter": "Filtros de fecha",
      "DateTimeFilter": "Filtros de fecha y hora",
      "MatchCase": "Match Case",
      "Between": "Entre",
      "CustomFilterPlaceHolder": "Ingrese el valor",
      "CustomFilterDatePlaceHolder": "Elige una fecha",
      "AND": "Y",
      "OR": "O",
    },
    pager: {
      "currentPageInfo": "{0} de {1} páginas",
      "totalItemsInfo": "({0} registros)",
      "firstPageTooltip": "Ir a la primera página",
      "lastPageTooltip": "Ir a la última página",
      "nextPageTooltip": "Ir a la página siguiente",
      "previousPageTooltip": "Regresar a la pagina anterior",
      "nextPagerTooltip": "Ir al siguiente localizador",
      "previousPagerTooltip": "Ir al localizador anterior",
      "pagerDropDown": "Registros por página",
      "pagerAllDropDown": "Registros",
      "All": "Todos",
      "totalItemInfo": "({0} registros)"
    }
  }
});

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [ToolbarService, PdfExportService, ExcelExportService, VirtualScrollService]
})

export class UsuariosComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = ';'
  unidades: any[] = [];
  condominio: any[] = [];

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public commands: CommandModel[];
  //botones exportar
  @ViewChild('grid') public grid: GridComponent | any;
  public queryClone: any;

  constructor(
    private router: Router,
    private _unidades: UnidadesService,
  ) {
    this.pageSettings = { pageSize: 5 }

    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{ title: 'Usuarios', buttonOption: { iconCss: 'e-icons e-people', cssClass: 'e-flat' } },
    { title: 'Unidad', buttonOption: { iconCss: 'e-icons e-home', cssClass: 'e-flat' } }];
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  ngOnInit(): void {
    setCulture('es');
    this.getListUsuarios();
  }

  getListUsuarios() {
    this.subscription.add(
      this._unidades.getAllUnidades(this.idCondominio).subscribe(data => {
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

  //Seleccionar editar o eliminar usuario
  commandClick(args: any): void {
    if (args.target?.title === 'Usuarios') {
      sessionStorage.setItem('idUsuario', <string>args.rowData['idUsuario']);
      this.router.navigate(['/admin/ajustes/ajustesUsuariosEdit']);

    } else if (args.target?.title === 'Unidad') {
      sessionStorage.setItem('idUnidad', <string>args.rowData['idUnidad']);
      this.router.navigate(['/admin/ajustes/ajustesUnidadesEdit']);
    }
    //console.log(JSON.stringify(args.rowData));
  }

  onGoUsuarios() {
    this.router.navigate(['/admin/ajustes/ajustesUsuarios']);
  }
  onGoUnidades() {
    this.router.navigate(['admin/ajustes/ajustesUnidadesSelectUser']);
  }

  //Seleccionar exportar excel y pdf
  toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'usuarios.pdf'
      };
      this.queryClone = this.grid.query;
      this.grid.query = new Query().addParams('recordcount', '12');
      this.grid.pdfExport(pdfExportProperties);
      //this.grid.pdfExport();
    } else if (args.item.id === 'Grid_excelexport') {
      this.queryClone = this.grid.query;
      this.grid.query = new Query().addParams('recordcount', '12');
      this.grid.excelExport();
    }
  }

  pdfExportComplete(): void {
    this.grid.query = this.queryClone;
  }

  excelExportComplete(): void {
    this.grid.query = this.queryClone;
  }

  rowDataBound(args: any) {
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

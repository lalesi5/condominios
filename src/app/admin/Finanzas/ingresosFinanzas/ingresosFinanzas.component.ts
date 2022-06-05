import {Component, OnInit, ViewChild} from "@angular/core";
import {Subscription} from "rxjs";
import {
  CommandModel,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import {Router} from "@angular/router";
import {UnidadesService} from "../../../services/unidades.service";
import {Query} from "@syncfusion/ej2-data";

@Component({
  selector: 'app-ingresosFinanzas',
  templateUrl: './ingresosFinanzas.component.html',
  styleUrls: ['./ingresosFinanzas.component.css']
})

export class IngresosFinanzasComponent implements OnInit {
  private subscription: Subscription = new Subscription;
  unidades: any[] = [];
  idCondominio: string = '';

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public commands: CommandModel[];
  public queryClone: any;
  @ViewChild('grid', {static: true})
  public grid!: GridComponent;

  constructor(
    private router: Router,
    private _unidadService: UnidadesService
  ) {
    this.pageSettings = {pageSize: 6}
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{title: 'seleccionar', buttonOption: {iconCss: 'e-icons e-save', cssClass: 'e-flat'}}];
    this.recoverData();
  }

  ngOnInit(): void {
    this.onListUnidades();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  onListUnidades() {
    try {
      this.subscription.add(
        this._unidadService
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

  commandClick(args: any) {
    if (args.target?.title === 'seleccionar') {
      sessionStorage.setItem('idUnidad', <string>args.rowData['idUnidad']);
      sessionStorage.setItem('cuotaUnidad', args.rowData['cuotaUnidad'])
      this.router.navigate(['/admin/finanzas/registrarMensualidad']);
    }
    //console.log(JSON.stringify(args.rowData));
  }

  //Seleccionar exportar excel y pdf
  toolbarClick(args: any): void {
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

  //evento para buscar al coincidir una letra
  created(): void {
    document.getElementById(this.grid.element.id + "_searchbar")!.addEventListener('keyup', () => {
      this.grid.search((event!.target as HTMLInputElement).value)
    });
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {
  CommandModel,
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

@Component({
  selector: 'app-tabla-cobranzas',
  templateUrl: './tabla-cobranzas.component.html',
  styleUrls: ['./tabla-cobranzas.component.css']
})
export class TablaCobranzasComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  unidades: any[] = [];

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public queryClone: any;
  public commands: CommandModel[];
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
    private _dialogService: DialogService,
  ) {
    this.recoverData();
    this.pageSettings = {pageSize: 6}
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{title: 'Seleccionar', buttonOption: {iconCss: 'e-icons e-eye', cssClass: 'e-flat'}}];
  }

  ngOnInit(): void {
    this.getUnidades();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getUnidades() {
    this.subscription.add(
      this._unidadesService.getAllUnidades(this.idCondominio).subscribe(data => {
        this.unidades = [];
        data.forEach((element: any) => {
          this.unidades.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }

  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'cuentas.pdf'
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

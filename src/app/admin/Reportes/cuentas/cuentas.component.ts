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
import {DialogService} from "../../../services/dialog.service";
import {CuentasService} from "../../../services/cuentas.service";
import {Query} from "@syncfusion/ej2-data";

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  cuentas: any[] = [];

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public queryClone: any;
  public commands: CommandModel[];
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _cuentasService: CuentasService,
    private _dialogService: DialogService,
  ) {
    this.recoverData();
    this.pageSettings = {pageSize: 6}
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{title: 'Seleccionar', buttonOption: {iconCss: 'e-icons e-eye', cssClass: 'e-flat'}}];
  }

  ngOnInit(): void {
    this.getCuentas();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getCuentas() {
    this.subscription.add(
      this._cuentasService.getCuentas(this.idCondominio).subscribe(data => {
        this.cuentas = [];
        data.forEach((element: any) => {
          this.cuentas.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }

  commandClick(item: any): void {
    if (item.target?.title === 'Seleccionar') {
      sessionStorage.setItem('idCuenta', <string>item.rowData['idCuenta']);
      this.router.navigate(['/admin/reportes/cuentasFecha']);
    }
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

import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {IngresoUnidadesService} from "../../../services/pagos.service";
import {
  CommandModel,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import {Query} from "@syncfusion/ej2-data";

@Component({
  selector: 'app-cuentas-selected',
  templateUrl: './cuentas-selected.component.html',
  styleUrls: ['./cuentas-selected.component.css']
})
export class CuentasSelectedComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  idCuenta: string = '';
  fechaInicio: number = 0;
  fechaFin: number = 0;
  cuenta: any[] = [];
  timestamp = new Date();

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public queryClone: any;
  public commands: CommandModel[];
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _cuentasService: IngresoUnidadesService,
  ) {
    this.recoverData();
    this.pageSettings = {pageSize: 6}
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{title: 'Anular Egreso', buttonOption: {iconCss: 'e-icons e-delete', cssClass: 'e-flat'}}];
  }

  ngOnInit(): void {
    this.getCuentasFechaRango();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idCuenta = <string>sessionStorage.getItem('idCuenta');
    // @ts-ignore
    this.fechaInicio = sessionStorage.getItem('fechaInicio')
    // @ts-ignore
    this.fechaFin = sessionStorage.getItem('fechaFin')



  }

  getCuentasFechaRango() {
    this.subscription.add(
      this._cuentasService.getPagosCondominioCuenta(this.idCondominio, this.idCuenta).subscribe(data => {
        this.cuenta = [];
        this.fechaInicio = parseInt(String(this.fechaInicio));
        this.fechaFin = parseInt(String(this.fechaFin));
        data.forEach((element: any) => {
          //console.log(typeof (Date.parse(element.payload.doc.data()['fechaReciboPago'])));
          //console.log(typeof (this.fechaInicio));
          if( Date.parse(element.payload.doc.data()['fechaReciboPago']) >= this.fechaInicio && Date.parse(element.payload.doc.data()['fechaReciboPago']) <= this.fechaFin){
            this.cuenta.push({
              ...element.payload.doc.data()
            })
          }
        })
      //console.log(this.cuenta);
      })
    )
  }

  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'ingresosUnidades.pdf'
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

  onBacktoList(): void {
    this.router.navigate(['admin/reportes/cuentasFecha']);
  }




}

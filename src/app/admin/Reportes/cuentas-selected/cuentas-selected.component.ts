import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {IngresoUnidadesService} from "../../../services/pagos.service";
import {CommandModel, GridComponent, PageSettingsModel, ToolbarItems} from "@syncfusion/ej2-angular-grids";

@Component({
  selector: 'app-cuentas-selected',
  templateUrl: './cuentas-selected.component.html',
  styleUrls: ['./cuentas-selected.component.css']
})
export class CuentasSelectedComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  idCuenta: string = '';
  rangoFecha: string = '';
  cuenta: any[] = [];

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
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.idCuenta = <string>sessionStorage.getItem('idCuenta');
    this.rangoFecha = <string>sessionStorage.getItem('fechaInicio');
  }


}
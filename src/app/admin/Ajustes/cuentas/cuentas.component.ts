import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import {
  CommandModel,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "../../../services/dialog.service";
import { CuentasService } from "../../../services/cuentas.service";
import { Query } from "@syncfusion/ej2-data";

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = ''
  cuentas: any[] = [];

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public commands: CommandModel[];
  public queryClone: any;
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _cuentas: CuentasService,
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
    this.getCuentas();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getCuentas() {
    this.subscription.add(
      this._cuentas.getCuentas(this.idCondominio).subscribe(data => {
        this.cuentas = [];
        data.forEach((element: any) => {
          this.cuentas.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  commandClick(item: any): void {
    if (item.target?.title === 'Editar') {
      sessionStorage.setItem('idCuenta', <string>item.rowData['idCuenta']);
      this.router.navigate(['/admin/ajustes/cuentasEdit']);

    } else if (item.target?.title === 'Eliminar') {
      const id = <string>item.rowData['idCuenta'];
      this._dialogService.confirmDialog({
        title: 'Eliminar Cuenta',
        message: '¿Está seguro de eliminar la cuenta?',
        confirmText: 'Si',
        cancelText: 'No',
      }).subscribe(res => {
        if (res) {
          this._cuentas.deleteCuenta(id).then(() => {
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

  onGoCreate() {
    this.router.navigate(['/admin/ajustes/cuentasCreate']);
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

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
import {ToastrService} from "ngx-toastr";
import {DialogService} from "../../../services/dialog.service";
import {Query} from "@syncfusion/ej2-data";
import {TiposPagoService} from "../../../services/tiposPago.service";

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  pagos: any[] = [];

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public commands: CommandModel[];
  public queryClone: any;
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _pagosService: TiposPagoService,
    private toastr: ToastrService,
    private _dialogService: DialogService
  ) {
    this.pageSettings = {pageSize: 6}
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{title: 'Editar', buttonOption: {iconCss: 'e-icons e-edit', cssClass: 'e-flat'}},
      {title: 'Eliminar', buttonOption: {iconCss: 'e-icons e-delete', cssClass: 'e-flat'}}];
    this.recoverData();
  }

  ngOnInit(): void {
    this.getTiposPagos();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getTiposPagos() {
    this.subscription.add(
      this._pagosService.getTiposPago(this.idCondominio).subscribe(data => {
        this.pagos = [];
        data.forEach((element: any) => {
          this.pagos.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  commandClick(item: any): void {
    if (item.target?.title === 'Editar') {
      sessionStorage.setItem('idTipoPago', <string>item.rowData['idTipoPago']);
      this.router.navigate(['/admin/ajustes/pagosEdit']);

    } else if (item.target?.title === 'Eliminar') {
      const id = <string>item.rowData['idTipoPago'];
      this._dialogService.confirmDialog({
        title: 'Eliminar Tipo Pago',
        message: '¿Está seguro de eliminar el tipo de pago?',
        confirmText: 'Si',
        cancelText: 'No',
      }).subscribe(res => {
        if (res) {
          this._pagosService.deleteTipoPago(id).then(() => {
            this.toastr.success('El tipo de pago fue eliminado con exito', 'Tipo de Pago eliminado', {
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
    this.router.navigate(['/admin/ajustes/pagosCreate']);
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


}

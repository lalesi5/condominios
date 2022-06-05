import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommandModel, GridComponent, PageSettingsModel, PdfExportProperties, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { Query } from '@syncfusion/ej2-data';

import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { AreasComunalesService } from 'src/app/services/areasComunales.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-listar-areas-comunes',
  templateUrl: './listar-areas-comunes.component.html',
  styleUrls: ['./listar-areas-comunes.component.css']
})
export class ListarAreasComunesComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = ''
  areasComunales: any[] = [];

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public commands: CommandModel[];
  public queryClone: any;
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _areaComunalService: AreasComunalesService,
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
    this.getAreasComunales();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getAreasComunales() {
    this.subscription.add(
      this._areaComunalService.getAreasComunales(this.idCondominio).subscribe(data => {
        this.areasComunales = [];
        data.forEach((element: any) => {
          this.areasComunales.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  //Seleccionar editar o eliminar usuario
  commandClick(item: any): void {
    if (item.target?.title === 'Editar') {
      sessionStorage.setItem('idAreaComunal', <string>item.rowData['idAreaComunal']);
      this.router.navigate(['/admin/administracion/areasComunes/areasComunesEdit']);

    } else if (item.target?.title === 'Eliminar') {
      const id = <string>item.rowData['idAreaComunal'];
      this._dialogService.confirmDialog({
        title: 'Eliminar área',
        message: '¿Está seguro de eliminar el área?',
        confirmText: 'Si',
        cancelText: 'No',
      }).subscribe(res => {
        if (res) {
          this._areaComunalService.deleteAreasComunales(id).then(() => {
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
    this.router.navigate(['/admin/administracion/areasComunes/areasComunesCreate']);
  }

  //Seleccionar exportar excel y pdf
  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'areasComunes.pdf'
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

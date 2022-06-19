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
import {DialogService} from "../../../services/dialog.service";
import {ToastrService} from "ngx-toastr";
import {Query} from "@syncfusion/ej2-data";
import {IngresoUnidadesService} from "../../../services/pagos.service";

@Component({
  selector: 'app-egresosFinanzas',
  templateUrl: './egresosFinanzas.component.html',
  styleUrls: ['./egresosFinanzas.component.css']
})

export class EgresosFinanzasComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  egresos: any[] = [];

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public queryClone: any;
  public commands: CommandModel[];
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _egresos: IngresoUnidadesService,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.recoverData();
    this.pageSettings = {pageSize: 6}
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{title: 'Anular Egreso', buttonOption: {iconCss: 'e-icons e-delete', cssClass: 'e-flat'}}];
  }

  ngOnInit(): void {
    this.getEgresos();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getEgresos(){
    this.subscription.add(
      this._egresos.getEgresos(this.idCondominio).subscribe(data => {
        this.egresos = [];
        data.forEach((element: any) => {
          this.egresos.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }

  onGoCreate() {
    this.router.navigate(['/admin/finanzas/registroEgresos']);
    sessionStorage.setItem('idCondominio', <string>this.idCondominio);
  }

  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'egresos.pdf'
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

  commandClick(item: any): void{
    if(item.target?.title == 'Anular Egreso'){
      const id = <string>item.rowData['idPago'];
      this._dialogService.confirmDialog({
        title: 'Anular Egreso',
        message: '¿Está seguro de anular el egreso?',
        confirmText: 'Sí',
        cancelText: 'No'
      }).subscribe( res => {
        if (res) {
          const egreso: any = {
            estadoIngreso: 'Inactivo'
          }
          this._egresos.updatePago(id, egreso).then(() => {
            this.toastr.success('El egreso ha sido anulado con exito', 'Egreso Anulado', {
              positionClass: 'toast-bottom-right'
            });
          }).catch(error => {
            console.log(error);
          })
        }
      })
    }
  }

  pdfExportComplete(): void {
    this.grid.query = this.queryClone;
  }

  excelExportComplete(): void {
    this.grid.query = this.queryClone;
  }

}

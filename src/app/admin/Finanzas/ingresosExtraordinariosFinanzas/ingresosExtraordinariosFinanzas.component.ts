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
import {extraordinariosService} from "../../../services/extraordinarios.service";
import {Query} from "@syncfusion/ej2-data";

@Component({
  selector: 'app-ingresosExtraordinariosFinanzas',
  templateUrl: './ingresosExtraordinariosFinanzas.component.html',
  styleUrls: ['./ingresosExtraordinariosFinanzas.component.css']
})

export class IngresosExtraordinariosFinanzasComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  pagosExtraordinarios: any[] = [];

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public queryClone: any;
  public commands: CommandModel[];
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _extraordinariosService: extraordinariosService,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {
    this.recoverData();
    this.pageSettings = {pageSize: 6}
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{title: 'Anular Pago', buttonOption: {iconCss: 'e-icons e-delete', cssClass: 'e-flat'}}];
  }

  ngOnInit():void {
    this.getPagosExtraordinarios();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  getPagosExtraordinarios(){
    this.subscription.add(
      this._extraordinariosService.getExtraordinarios(this.idCondominio).subscribe(data => {
        this.pagosExtraordinarios = [];
        data.forEach((element: any) => {
          this.pagosExtraordinarios.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }

  onGoCreate() {
    this.router.navigate(['/admin/finanzas/registroExtraordinarios']);
    sessionStorage.setItem('idCondominio', <string>this.idCondominio);
  }

  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'ingresosExtraordinarios.pdf'
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
    if(item.target?.title == 'Anular Pago'){
      const id = <string>item.rowData['idExtraordinario'];
      this._dialogService.confirmDialog({
        title: 'Anular Pago',
        message: '¿Está seguro de anular el pago?',
        confirmText: 'Sí',
        cancelText: 'No'
      }).subscribe( res => {
        if (res) {
          const pagoExtraordinario: any = {
            estadoIngreso: 'Inactivo'
          }
          this._extraordinariosService.updateExtraordinario(id, pagoExtraordinario).then(() => {
            this.toastr.success('El pago ha sido anulado con exito', 'Pago Anulado', {
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

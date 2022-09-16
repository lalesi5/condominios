import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { ReservasService } from "../../../services/reservas.service";
import { UnidadesService } from "../../../services/unidades.service";
import { Router } from "@angular/router";
import {audithService} from "../../../services/audith.service";
import {
  CommandModel,
  ExcelExportProperties,
  GridComponent,
  PageSettingsModel,
  PdfExportProperties,
  ToolbarItems
} from "@syncfusion/ej2-angular-grids";
import { Query } from "@syncfusion/ej2-data";
import { IngresoUnidadesService } from "../../../services/pagos.service";
import { DialogService } from "../../../services/dialog.service";
import { ToastrService } from "ngx-toastr";
import { PdfStandardFont, PdfFontFamily, PdfFontStyle } from '@syncfusion/ej2-pdf-export';
import {DatePipe} from "@angular/common";
import {TablaCobranzaService} from "../../../services/tablaCobranza.service";

@Component({
  selector: 'app-registro-mensualidad',
  templateUrl: './registro-mensualidad.component.html',
  styleUrls: ['./registro-mensualidad.component.css']
})
export class RegistroMensualidadComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idUnidad: string = '';
  idCondominio: string = '';
  reservas: any[] = [];
  unidad: any[] = [];
  ingresoUnidades: any[] = [];
  tablaCobranzas: any[] = [];
  sumaValorReservas: number = 0;
  cuotaUnidad: number = 0;
  myDate = new Date();
  date = new Date();
  pipe = new DatePipe('en-US');

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public queryClone: any;
  public commands: CommandModel[];
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _reservasService: ReservasService,
    private _unidadesService: UnidadesService,
    private _ingresoUnidadesService: IngresoUnidadesService,
    private _dialogService: DialogService,
    private _tablaCobranzas: TablaCobranzaService,
    private toastr: ToastrService,
    private _auditService: audithService
  ) {
    this.recoverData();
    this.pageSettings = { pageSize: 6 }
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{ title: 'Anular Pago', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } }];
  }

  ngOnInit(): void {
    this.getValoresReservas();
    this.getUnidadCuotaReserva();
    this.getIngresoUnidades();
    this.getTablaCobranzas();
  }

  recoverData() {
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }


  getTablaCobranzas() {
    //let fecha = 'noviembre2022'
    let fecha = this.date.toLocaleString("es-ES", {month: "long"}) + this.date.toLocaleString("es-ES", {year: 'numeric'})

    this.subscription.add(
      this._tablaCobranzas.getTablaCobranzasByUnidad(this.idUnidad).subscribe(data => {
        this.tablaCobranzas = [];
        data.forEach((element: any) => {
          this.tablaCobranzas.push({
            ...element.payload.doc.data(),
          })
        })

        if(fecha == 'septiembre2022'){
          this.tablaCobranzas.forEach((element: any) => {
            const actualizarUnidad = {
              cuotaUnidad: element.septiembre2022
            }
            this._unidadesService.actualizarUnidad(this.idUnidad, actualizarUnidad);
          })
        }
        else if(fecha == 'octubre2022'){
          this.tablaCobranzas.forEach((element: any) => {
            const actualizarUnidad = {
              cuotaUnidad: element.octubre2022
            }
            this._unidadesService.actualizarUnidad(this.idUnidad, actualizarUnidad);
          })
        }
        else if(fecha == 'noviembre2022'){
          this.tablaCobranzas.forEach((element: any) => {
            const actualizarUnidad = {
              cuotaUnidad: element.noviembre2022
            }
            this._unidadesService.actualizarUnidad(this.idUnidad, actualizarUnidad);
          })
        }
        else if(fecha == 'diciembre2022'){
          this.tablaCobranzas.forEach((element: any) => {
            const actualizarUnidad = {
              cuotaUnidad: element.septiembre2022
            }
            this._unidadesService.actualizarUnidad(this.idUnidad, actualizarUnidad);
          })
        }
        else if(fecha == 'enero2023'){
          this.tablaCobranzas.forEach((element: any) => {
            const actualizarUnidad = {
              cuotaUnidad: element.septiembre2022
            }
            this._unidadesService.actualizarUnidad(this.idUnidad, actualizarUnidad);
          })
        }
        else if(fecha == 'febrero2023'){
          this.tablaCobranzas.forEach((element: any) => {
            const actualizarUnidad = {
              cuotaUnidad: element.septiembre2022
            }
            this._unidadesService.actualizarUnidad(this.idUnidad, actualizarUnidad);
          })
        }
        else if(fecha == 'marzo2023'){
          this.tablaCobranzas.forEach((element: any) => {
            const actualizarUnidad = {
              cuotaUnidad: element.septiembre2022
            }
            this._unidadesService.actualizarUnidad(this.idUnidad, actualizarUnidad);
          })
        }
        else if(fecha == 'abril2023'){
          this.tablaCobranzas.forEach((element: any) => {
            const actualizarUnidad = {
              cuotaUnidad: element.septiembre2022
            }
            this._unidadesService.actualizarUnidad(this.idUnidad, actualizarUnidad);
          })
        }
        else if(fecha == 'mayo2023'){
          this.tablaCobranzas.forEach((element: any) => {
            const actualizarUnidad = {
              cuotaUnidad: element.septiembre2022
            }
            this._unidadesService.actualizarUnidad(this.idUnidad, actualizarUnidad);
          })
        }
        else if(fecha == 'junio2023'){
          this.tablaCobranzas.forEach((element: any) => {
            const actualizarUnidad = {
              cuotaUnidad: element.septiembre2022
            }
            this._unidadesService.actualizarUnidad(this.idUnidad, actualizarUnidad);
          })
        }
      })
    )
  }

  getValoresReservas() {
    this.subscription.add(
      this._reservasService.getReservasValorPago(this.idUnidad).subscribe(data => {
        this.reservas = [];
        data.forEach((element: any) => {
          this.reservas.push({
            ...element.payload.doc.data()
          })
        })
        //suma todos los valores de reservas que pertenecen a esa unidad y que tienen pagoReserva = Por Pagar
        this.reservas.map(data => {
          this.sumaValorReservas += data.valorReserva;
        })
      })
    )
  }

  getUnidadCuotaReserva() {
    this.subscription.add(
      this._unidadesService.getUnidadesById(this.idUnidad).subscribe(data => {
        this.unidad = [];
        data.forEach((element: any) => {
          this.unidad.push({
            ...element.payload.doc.data()
          })
        })
        this.unidad.map(data => {
          this.cuotaUnidad = data.cuotaUnidad;
        })
      })
    )
  }

  getIngresoUnidades() {
    this.subscription.add(
      this._ingresoUnidadesService.getPagos(this.idUnidad).subscribe(data => {
        this.ingresoUnidades = [];
        data.forEach((element: any) => {
          this.ingresoUnidades.push({
            ...element.payload.doc.data(),
          })
        })
      })
    )
  }

  onGoCreate() {
    this.router.navigate(['/admin/finanzas/crearPagoMensualidad']);
    sessionStorage.setItem('idUnidad', <string>this.idUnidad);
  }

  //Seleccionar exportar excel y pdf
  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        pageOrientation: 'Landscape',
        fileName: 'Mensualidad' + sessionStorage.getItem('unidad') + '.pdf',
        theme: {
          header: {
            font: new PdfStandardFont(PdfFontFamily.TimesRoman, 11, PdfFontStyle.Bold)
          }
        },
        header: {
          fromTop: 0,
          height: 130,
          contents: [
            {
              type: 'Text',
              value: "CONDOMINIOS EPN - Registro de Mensualidades - " + sessionStorage.getItem('unidad'),
              position: { x: 0, y: 50 },
              style: { textBrushColor: '#000000', fontSize: 20 }
            },
          ]
        },
        footer: {
          fromBottom: 160,
          height: 150,
          contents: [
            {
              type: 'PageNumber',
              pageNumberType: 'Arabic',
              format: 'Página {$current} de {$total}',
              position: { x: 0, y: 25 },
              style: { textBrushColor: '#000000', fontSize: 15 }
            }
          ]
        }
      }

      this.queryClone = this.grid.query;
      this.grid.query = new Query().addParams('recordcount', '12');
      this.grid.pdfExport(pdfExportProperties);
    } else if (args.item.id === 'Grid_excelexport') {
      const excelExportProperties: ExcelExportProperties = {
        fileName: 'Mensualidad' + sessionStorage.getItem('unidad') + '.xlsx',
        header: {
          headerRows: 5,
          rows: [
            {
              cells: [{
                colSpan: 10, value: 'CONDOMINIOS EPN',
                style: { fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true, }
              }]
            },
            {
              cells: [{
                colSpan: 10, value: 'Mensualidades de ' + sessionStorage.getItem('unidad'),
                style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true, }
              }]
            },
            { cells: [{ colSpan: 10, hyperlink: { target: 'mailto:condominios.epn@gmail.com' }, style: { hAlign: 'Center' } }] },
          ]
        },
        footer: {
          footerRows: 3,
          rows: [
            { cells: [{ colSpan: 10, value: 'Información del Sistema de Gestion de Condominios!', style: { hAlign: 'Center', bold: true } }] }
          ]
        },
      };
      this.queryClone = this.grid.query;
      this.grid.query = new Query().addParams('recordcount', '12');
      this.grid.excelExport(excelExportProperties);
    }
  }

  commandClick(item: any): void {
    if (item.target?.title == 'Anular Pago') {
      const id = <string>item.rowData['idPago'];
      this._dialogService.confirmDialog({
        title: 'Anular Pago',
        message: '¿Está seguro de anular el pago?',
        confirmText: 'Sí',
        cancelText: 'No'
      }).subscribe(res => {
        if (res) {
          this.audit(id);
          const pagoMensualidad: any = {
            estadoIngreso: 'Inactivo'
          }
          this._ingresoUnidadesService.updatePago(id, pagoMensualidad).then(() => {
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

  audit(idMensualidad:any) {
    const datos: any = {
      modulo: 'Registrar-Mensualidad',
      idUsuario: sessionStorage.getItem('idAdministrador'),
      accion: 'Eliminar Pago Mensualidad',
      fechaActualizacion: this.myDate,
      idMensualidadEliminada: idMensualidad
    }
    this._auditService.saveAudith(datos);
  }

  pdfExportComplete(): void {
    this.grid.query = this.queryClone;
  }

  excelExportComplete(): void {
    this.grid.query = this.queryClone;
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/finanzas/ingresosFinanzas']);
  }

  //evento para buscar al coincidir una letra
  created(): void {
    document.getElementById(this.grid.element.id + "_searchbar")!.addEventListener('keyup', () => {
      this.grid.search((event!.target as HTMLInputElement).value)
    });
  }
}

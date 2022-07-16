import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Subscription } from "rxjs";
import { DialogService } from 'src/app/services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { Query } from '@syncfusion/ej2-data';
import { PdfStandardFont, PdfFontFamily, PdfFontStyle } from '@syncfusion/ej2-pdf-export';
import { CommandModel, ExcelExportProperties, GridComponent, PageSettingsModel, PdfExportProperties, ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-ajustes-usuarios',
  templateUrl: './ajustes-usuarios.component.html',
  styleUrls: ['./ajustes-usuarios.component.css']
})
export class AjustesUsuariosComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  imgCondominio: string = '';
  usuarios: any[] = [];
  condominio: any[] = [];

  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public commands: CommandModel[];
  public queryClone: any;
  @ViewChild('grid') public grid: GridComponent | any;

  constructor(
    private router: Router,
    private _usuarioService: UsuariosService,
    private toastr: ToastrService,
    private _dialogService: DialogService,

  ) {
    this.pageSettings = { pageSize: 6 }
    this.toolbarOptions = ['PdfExport', 'ExcelExport', 'Search'];
    this.commands = [{ title: 'Editar', buttonOption: { iconCss: 'e-icons e-edit', cssClass: 'e-flat' } },
    { title: 'Eliminar', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } }];
    this.recoverData();
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    console.log(sessionStorage);

    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    this.imgCondominio = <string>sessionStorage.getItem('imgCondominio');
  }

  getUsuarios() {
    this.subscription.add(
      this._usuarioService.getUsuarios(this.idCondominio).subscribe(data => {
        this.usuarios = [];
        data.forEach((element: any) => {
          this.usuarios.push({
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
      sessionStorage.setItem('idUsuario', <string>item.rowData['idUsuario']);
      this.router.navigate(['/admin/ajustes/ajustesUsuariosEdit']);

    } else if (item.target?.title === 'Eliminar') {
      const id = <string>item.rowData['idUsuario'];
      this._dialogService.confirmDialog({
        title: 'Atención!',
        message: 'DEBE ELIMINAR PRIMERO LA UNIDAD A LA QUE PERTENECE EL USUARIO ¿Ha realizado esta acción?',
        confirmText: 'Si',
        cancelText: 'No',
      }).subscribe(res => {
        if (res) {
          this._dialogService.confirmDialog({
            title: 'Eliminar usuario',
            message: '¿Está seguro de eliminar el usuario?',
            confirmText: 'Si',
            cancelText: 'No',
          }).subscribe(res => {
            if (res) {

              this._usuarioService.eliminarUsuario(id).then(() => {
                this.toastr.success('El usuario fue eliminado con exito', 'Registro eliminado', {
                  positionClass: 'toast-bottom-right'
                });
              }).catch(error => {
                console.log(error);
              })
            }
          });
        }
      });
    }
  }

  onGoCreate() {
    this.router.navigate(['/admin/ajustes/ajustesUsuariosCreate']);
  }

  //Seleccionar exportar excel y pdf
  toolbarClick(args: any): void {
    if (args.item.id === 'Grid_pdfexport') {
      const pdfExportProperties: PdfExportProperties = {
        fileName: 'Usuarios.pdf',
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
              value: "CONDOMINIOS EPN - Información de Usuarios",
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
        fileName: 'Usuarios.xlsx',
        header: {
          headerRows: 5,
          rows: [
            {
              cells: [{
                colSpan: 5, value: 'CONDOMINIOS EPN',
                style: { fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true, }
              }]
            },
            {
              cells: [{
                colSpan: 5, value: 'Información de Usuarios',
                style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true, }
              }]
            },
            { cells: [{ colSpan: 5, hyperlink: { target: 'mailto:condominios.epn@gmail.com' }, style: { hAlign: 'Center' } }] },
          ]
        },
        footer: {
          footerRows: 3,
          rows: [
            { cells: [{ colSpan: 5, value: 'Información del Sistema de Gestion de Condominios!', style: { hAlign: 'Center', bold: true } }] }
          ]
        },
      };
      this.queryClone = this.grid.query;
      this.grid.query = new Query().addParams('recordcount', '12');
      this.grid.excelExport(excelExportProperties);
    }
  }

  pdfExportComplete(): void {
    this.grid.query = this.queryClone;
  }

  excelExportComplete(): void {
    this.grid.query = this.queryClone;
  }

  //evento para buscar al coincidir una letra
  created(): void {
    document.getElementById(this.grid.element.id + "_searchbar")!.addEventListener('keyup', () => {
      this.grid.search((event!.target as HTMLInputElement).value)
    });
  }
}

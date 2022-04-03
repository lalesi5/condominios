import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { UnidadesService } from "../../../../services/unidades.service";
import { CommandModel, GridComponent, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-unidades',
  templateUrl: './listar-unidades.component.html',
  styleUrls: ['./listar-unidades.component.css']
})
export class ListarUnidadesComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  unidades: any[] = [];
  idCondominio: string = '';

  public pageSettings: PageSettingsModel;
  public commands: CommandModel[];
  @ViewChild('grid', { static: true })
  public grid!: GridComponent;

  constructor(
    private router: Router,
    private _unidadService: UnidadesService
  ) {
    this.pageSettings = { pageSize: 6 }
    this.commands = [{ title: 'seleccionar', buttonOption: { iconCss: 'e-icons e-eye', cssClass: 'e-flat' } }];
    this.recoverData();
  }

  ngOnInit(): void {
    this.onListUnidades();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  onListUnidades() {
    try {
      this.subscription.add(
        this._unidadService
          .getAllUnidades(this.idCondominio)
          .subscribe(data => {
            this.unidades = [];
            data.forEach((element: any) => {
              this.unidades.push({
                id: element.payload.doc.id,
                ...element.payload.doc.data()
              })
            })
          })
      )
    } catch (err) {
      console.log(err);
    }
  }

  onGoUnits(item: any) {
    sessionStorage.setItem('idUnidad', <string>item.idUnidad);
    this.router.navigate(['/admin/administracion/unidades']);
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

  commandClick(args: any) {
    if (args.target?.title === 'seleccionar') {
      sessionStorage.setItem('idUnidad', <string>args.rowData['idUnidad']);
      this.router.navigate(['/admin/administracion/unidades']);
    }
    //console.log(JSON.stringify(args.rowData));
  }

}

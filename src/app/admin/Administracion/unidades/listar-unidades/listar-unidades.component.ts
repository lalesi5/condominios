import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";
import {UnidadesService} from "../../../../services/unidades.service";

@Component({
  selector: 'app-listar-unidades',
  templateUrl: './listar-unidades.component.html',
  styleUrls: ['./listar-unidades.component.css']
})
export class ListarUnidadesComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  unidades: any[] = [];
  idCondominio: string = '';

  constructor(
    private router: Router,
    private _unidadService: UnidadesService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.onListUnidades();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData(){
    this.idCondominio = <string> sessionStorage.getItem('idCondominio');
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

  onGoUnits(item: any){
    sessionStorage.setItem('idUnidad', <string> item.idUnidad);
    this.router.navigate(['/admin/administracion/unidades']);
  }

}

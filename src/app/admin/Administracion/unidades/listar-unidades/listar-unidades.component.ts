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

  NavigationExtras: NavigationExtras = {
    state: {}
  }

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
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idCondominio = navigations.idCondominio;
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
    this.NavigationExtras.state = item;
    this.router.navigate(['/admin/administracion/unidades'], this.NavigationExtras);
  }

}

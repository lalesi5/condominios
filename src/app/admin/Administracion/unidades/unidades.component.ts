import {Component, OnInit} from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UnidadesService} from "../../../services/unidades.service";

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})

export class UnidadesComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idUnidad: string = '';
  unidad: any[] = [];
  unidades: any[] = [];

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _unidadesService: UnidadesService,
  ) {
    this.recoverData();
  }

  ngOnInit() {
    this.listarUnidad();
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idUnidad = navigations.idUnidad;
    this.unidad = navigations;
    this.NavigationExtras.state = this.unidad;
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/administracion/listarUnidades'], this.NavigationExtras);
  }

  listarUnidad() {
    this.subscription.add(
      this._unidadesService.getUnidadesById(this.idUnidad).subscribe(data => {
        this.unidades = [];
        data.forEach((element: any) => {
          this.unidades.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

}

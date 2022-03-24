import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AnunciosGeneralesService} from "../../services/anunciosGenerales.service";

@Component({
  selector: 'app-inicioUsuario',
  templateUrl: './inicioUsuario.component.html',
  styleUrls: ['./inicioUsuario.component.css']
})

export class InicioUsuarioComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idCondominio: string ='';
  anunciosGenerales: any[] = [];
  unidad: any[] = [];

  constructor(
    private router: Router,
    private _anunciosGeneralesService: AnunciosGeneralesService,
  ) {
    this.recoverData()
  }

  ngOnInit(): void {
    this.getAnunciosGenerales();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idCondominio = navigations.idCondominio;
    this.unidad = navigations;
  }

  getAnunciosGenerales() {
    this.subscription.add(
      this._anunciosGeneralesService.getAnunciosGenerales(this.idCondominio).subscribe(data => {
        this.anunciosGenerales = [];
        data.forEach((element: any) => {
          this.anunciosGenerales.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }
}

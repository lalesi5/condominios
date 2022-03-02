import {Component, OnDestroy, OnInit} from "@angular/core";
import {NavigationExtras, Router} from '@angular/router';
import {CondominioService} from '../../../services/condominios.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-ajustesCondominio',
  templateUrl: './ajustesCondominio.component.html',
  styleUrls: ['./ajustesCondominio.component.css']
})

export class AjustesCondominioComponent implements OnInit, OnDestroy {

  /*Variables*/

  private subscription: Subscription = new Subscription;
  condominios: any[] = [];
  impCondominios: any[] = [];
  idCondominio: string = '';

  /*Variables de retorno*/

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _condominioService: CondominioService
  ) {
    this.recoverData();
  }

  ngOnInit() {
    this.getCondominio();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idCondominio = navigations.idCondominio;
    this.condominios = navigations;
    this.NavigationExtras.state = this.condominios;
  }

  getCondominio() {
    try {
      this.subscription.add(
        this._condominioService
          .getCondominiosID(this.idCondominio)
          .subscribe(data => {
            data.forEach((element: any) => {
              this.impCondominios.push({
                ...element.payload.doc.data()
              })
            })
          })
      );
    } catch (err) {
      console.log(err);
    }
  }

  onEdit(): void {
    this.router.navigate(['/admin/ajustes/ajustesCondominioEdit'], this.NavigationExtras);
  }
}

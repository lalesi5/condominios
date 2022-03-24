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
  idCondominio: string = ''
  infoCondominio: any[] = [];
  condominio: any[] = [];

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
    this.getCondominios();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
    this.NavigationExtras.state = this.condominio;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCondominios() {
    this.subscription.add(
      this._condominioService.getCondominiosID(this.idCondominio).subscribe(data => {
        this.infoCondominio = [];
        data.forEach((element: any) => {
          this.infoCondominio.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })        
      })
    );
  }

  onGoEdit(item: any) {
    this.NavigationExtras.state = item;
    this.router.navigate(['/admin/ajustes/ajustesCondominioEdit', item.idCondominio], this.NavigationExtras);
  }
}

import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {CondominioService} from "../../../services/condominios.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})

export class TopBarComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  condominios: any[] = [];

  constructor(
    private _condominiosService: CondominioService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.onListCondominios();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idAministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  onListCondominios() {
    try {
      this.subscription.add(
        this._condominiosService
          .getCondominiosID(this.idCondominio)
          .subscribe(data => {
            this.condominios = [];
            data.forEach((element: any) => {
              this.condominios.push({
                ...element.payload.doc.data()
              })
            })
          })
      );
    } catch (err) {
      console.log(err);
    }
  }
}

import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AreasComunalesService} from "../../../services/areasComunales.service";

@Component({
  selector: 'app-areasComunes',
  templateUrl: './areasComunes.component.html',
  styleUrls: ['./areasComunes.component.css']
})

export class AreasComunesComponent implements OnInit, OnDestroy {

  private suscription: Subscription = new Subscription;
  areasComunes: any[] = [];
  idCondominio: string = '';

  constructor(
    private router: Router,
    private _areasComunalesService: AreasComunalesService,
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.onListAreasComunales();
  }

  ngOnDestroy(): void {
    this.onListAreasComunales();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  onListAreasComunales() {
    this.suscription.add(
      this._areasComunalesService.getAreasComunales(this.idCondominio).subscribe(data => {
        this.areasComunes = [];
        data.forEach((element: any) => {
          this.areasComunes.push({
            ...element.payload.doc.data()
          })
        })
      })
    )
  }

  onGoReservas(item: any){
    sessionStorage.setItem('idAreaComunal', <string>item.idAreaComunal);
    sessionStorage.setItem('nombreAreaComunal', <string>item.nombre);
    this.router.navigate(['/admin/administracion/reservas']);
  }


}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";
import {ReservasService} from "../../../services/reservas.service";

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  reservas: any[] = [];
  areaComunal: any[] = [];

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _reservaService: ReservasService,

  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.getReservas();
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  recoverData(){
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idCondominio = navigations.idCondominio;
    this.areaComunal = navigations;
    this.NavigationExtras.state = this.areaComunal;
  }

  getReservas(){
    this.subscription.add(
      this._reservaService.getReserva(this.idCondominio).subscribe(data =>{
        this.reservas = [];
        data.forEach((element: any) => {
          this.reservas.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/administracion/areasComunes'], this.NavigationExtras);
  }

  onGoCreate(): void {
    this.router.navigate(['/admin/administracion/reservasCreate'], this.NavigationExtras);
  }

}

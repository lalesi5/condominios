import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ReservasService} from "../../../services/reservas.service";

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAreaComunal: string = '';
  idUnidad: string = '';
  reservas: any[] = [];

  constructor(
    private router: Router,
    private _reservaService: ReservasService,

  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    //this.getReservas();
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  recoverData(){
    this.idUnidad = <string>sessionStorage.getItem('idUnidad');
    this.idAreaComunal = <string>sessionStorage.getItem('idAreaComunal');
  }

  /*getReservas(){
    this.subscription.add(
      this._reservaService.getReservaIdUnit(this.idAreaComunal, this.idUnidad).subscribe(data =>{
        this.reservas = [];
        data.forEach((element: any) => {
          this.reservas.push({
            ...element.payload.doc.data()
          })
        })
      })
    );
  }*/

  onBacktoList(): void {
    this.router.navigate(['/user/areasComunes']);
  }

  onGoCreate(): void {
    this.router.navigate(['/user/areasComunes/reservasCreate']);
  }


}

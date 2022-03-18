import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-reservas-create',
  templateUrl: './reservas-create.component.html',
  styleUrls: ['./reservas-create.component.css']
})
export class ReservasCreateComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAdministrador: string = '';
  idCondominio: string = '';
  loading = false;
  areaComunal: any[] = [];

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy():void {
  }

  recoverData(){
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAdministrador =  navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.areaComunal =  navigations;
    this.NavigationExtras.state = this.areaComunal;
  }

}

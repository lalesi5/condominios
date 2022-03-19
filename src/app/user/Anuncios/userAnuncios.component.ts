import { Component, OnInit } from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";

@Component({
    selector: 'app-userAnuncios',
    templateUrl: './userAnuncios.component.html',
    styleUrls: ['./userAnuncios.component.css']
})

export class UserAnunciosComponent implements OnInit{

  unidad: any[] = [];

  constructor(
    private router: Router
  ){
    this.recoverData()
  }

  ngOnInit(){}

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.unidad = navigations;
  }

}

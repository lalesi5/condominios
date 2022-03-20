import { Component, OnInit } from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";

@Component({
    selector: 'app-areasComunesUsuario',
    templateUrl: './areasComunesUsuario.component.html',
    styleUrls: ['./areasComunesUsuario.component.css']
})

export class AreasComunesUsuarioComponent implements OnInit{

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

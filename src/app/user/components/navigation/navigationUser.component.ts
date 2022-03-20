import {Component, OnInit} from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-navigationUser',
  templateUrl: './navigationUser.component.html',
  styleUrls: ['./navigationUser.component.css']
})

export class NavigationUserComponent implements OnInit {

  unidad: any[] = [];

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router
  ) {
    this.recoverData();
  }

  ngOnInit() {
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.unidad = navigations;
    this.NavigationExtras.state = this.unidad;
  }

  onGoInicio() {
    this.router.navigate(['/user/home'], this.NavigationExtras);
  }

  onGoComunicacion() {
    this.router.navigate(['/user/comunicacion'], this.NavigationExtras);
  }

  onGoAreasComunales() {
    this.router.navigate(['/user/areasComunes'], this.NavigationExtras);
  }

  onGoFinanzas() {
    this.router.navigate(['/user/finanzas'], this.NavigationExtras);
  }

  onGoAjustes() {
    this.router.navigate(['/user/ajustes'], this.NavigationExtras);
  }

  onLogout(): void {
    this.router.navigate(['/selectUnidad'], this.NavigationExtras)
  }
}

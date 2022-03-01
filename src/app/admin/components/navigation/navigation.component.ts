import {Component, OnInit} from "@angular/core";
import {AuthService} from "src/app/services/auth.service";
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {

  condominio: any[] = [];

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
  ) {
    this.recoverData();
  }

  ngOnInit() {
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.condominio = navigations;
    this.NavigationExtras.state = this.condominio;
  }

  onGoInicio() {
    this.router.navigate(['/admin/inicio'], this.NavigationExtras);
  }

  onGoAdministracion() {
    this.router.navigate(['/admin/administracion'], this.NavigationExtras);
  }

  onGoComunicacion() {
    this.router.navigate(['/admin/comunicacion'], this.NavigationExtras);
  }

  onGoReportes() {
    this.router.navigate(['/admin/reportes'], this.NavigationExtras);
  }

  onGoFinanzas() {
    this.router.navigate(['/admin/finanzas'], this.NavigationExtras);
  }

  onGoAjustes() {
    this.router.navigate(['/admin/ajustes'], this.NavigationExtras);
  }

  onLogout(): void {
    this.router.navigate(['/selectCondominio'], this.NavigationExtras)
  }
}

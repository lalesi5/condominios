import {Component, OnInit} from "@angular/core";
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  onGoInicio() {
    this.router.navigate(['/admin/inicio']);
  }

  onGoAdministracion() {
    this.router.navigate(['/admin/administracion']);
  }

  onGoComunicacion() {
    this.router.navigate(['/admin/comunicacion']);
  }

  onGoReportes() {
    this.router.navigate(['/admin/reportes']);
  }

  onGoFinanzas() {
    this.router.navigate(['/admin/finanzas']);
  }

  onGoAjustes() {
    this.router.navigate(['/admin/ajustes']);
  }

  onLogout(): void {
    this.router.navigate(['/selectCondominio'])
  }
}

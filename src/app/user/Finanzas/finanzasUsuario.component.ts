import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-finanzasUsuario',
  templateUrl: './finanzasUsuario.component.html',
  styleUrls: ['./finanzasUsuario.component.css']
})

export class FinanzasUsuarioComponent implements OnInit {
  unidad: any[] = [];

  constructor(
    private router: Router
  ) {
    this.recoverData()
  }

  ngOnInit() {
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.unidad = navigations;
  }
}

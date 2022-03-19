import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inicioUsuario',
  templateUrl: './inicioUsuario.component.html',
  styleUrls: ['./inicioUsuario.component.css']
})

export class InicioUsuarioComponent implements OnInit {
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

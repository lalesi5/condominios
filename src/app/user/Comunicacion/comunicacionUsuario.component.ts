import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-comunicacionUsuario',
  templateUrl: './comunicacionUsuario.component.html',
  styleUrls: ['./comunicacionUsuario.component.css']
})

export class ComunicacionUsuarioComponent implements OnInit {
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

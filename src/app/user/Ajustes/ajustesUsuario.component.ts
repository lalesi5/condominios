import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajustesUsuario',
  templateUrl: './ajustesUsuario.component.html',
  styleUrls: ['./ajustesUsuario.component.css']
})

export class AjustesUsuarioComponent implements OnInit {

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

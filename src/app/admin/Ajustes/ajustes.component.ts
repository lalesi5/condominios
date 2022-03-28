import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";


@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})

export class AjustesComponent implements OnInit {

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {

  }

  onGoAjustesAdmin() {
    this.router.navigate(['/admin/ajustes/ajustesAdmin']);
  }

  onGoAjustesCondominio() {
    this.router.navigate(['/admin/ajustes/ajustesCondominio']);
  }

  onGoAjustesAreasComunales() {
    this.router.navigate(['/admin/ajustes/ajustesAreasComunales']);
  }

  onGoAjustesajustesUnidades() {
    this.router.navigate(['/admin/ajustes/ajustesUnidadesSelectUser']);
  }

  onGoAjustesUsuarios() {
    this.router.navigate(['/admin/ajustes/ajustesUsuarios']);
  }
}

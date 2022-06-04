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

  onGoCuentas() {
    this.router.navigate(['/admin/ajustes/cuentas']);
  }

  onGoPagos() {
    this.router.navigate(['/admin/ajustes/pagos']);
  }

  onGoDescuentos() {
    this.router.navigate(['/admin/ajustes/descuentos']);
  }

  onGoAjustesCondominio() {
    this.router.navigate(['/admin/ajustes/ajustesCondominio']);
  }

  onGoAjustesajustesUnidades() {
    this.router.navigate(['/admin/ajustes/ajustesListarUnidades']);
  }

  onGoAjustesUsuarios() {
    this.router.navigate(['/admin/ajustes/ajustesUsuarios']);
  }

  onGoAjustesAreasComunales() {
    this.router.navigate(['/admin/ajustes/ajustesAreasComunales']);
  }


}

import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})

export class AdministracionComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  onGoAjustesUnidades() {
    this.router.navigate(['/admin/administracion/listarUnidades']);
  }

  onGoAjustesUsuarios() {
    this.router.navigate(['/admin/administracion/usuarios']);
  }

  onGoAjustesAreasComunales() {
    this.router.navigate(['/admin/administracion/areasComunes']);
  }


}

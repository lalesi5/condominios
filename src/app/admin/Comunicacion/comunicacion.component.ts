import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-comunicacion',
  templateUrl: './comunicacion.component.html',
  styleUrls: ['./comunicacion.component.css']
})

export class ComunicacionComponent implements OnInit {

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  onGoAnunciosGenerales() {
    this.router.navigate(['/admin/comunicacion/generales']);
  }

  onGoComunicadosIndividuales() {
    this.router.navigate(['/admin/comunicacion/individuales']);
  }

}

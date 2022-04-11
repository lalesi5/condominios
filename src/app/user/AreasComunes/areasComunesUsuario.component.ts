import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-areasComunesUsuario',
  templateUrl: './areasComunesUsuario.component.html',
  styleUrls: ['./areasComunesUsuario.component.css']
})

export class AreasComunesUsuarioComponent implements OnInit{

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

}

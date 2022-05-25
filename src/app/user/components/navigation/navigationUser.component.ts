import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigationUser',
  templateUrl: './navigationUser.component.html',
  styleUrls: ['./navigationUser.component.css']
})

export class NavigationUserComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
  }

  onGoInicio() {
    this.router.navigate(['/user/home']);
  }

  onGoComunicacion() {
    this.router.navigate(['/user/comunicacion']);
  }

  onGoAreasComunales() {
    this.router.navigate(['/user/areasComunes']);
  }

  onGoFinanzas() {
    this.router.navigate(['/user/finanzas']);
  }

  onGoAjustes() {
    this.router.navigate(['/user/ajustes']);
  }

  onLogout(): void {
    this.router.navigate(['/selectUnidad'])
  }
}

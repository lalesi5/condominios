import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";

@Component({
    selector: 'app-navigationUser',
    templateUrl: './navigationUser.component.html',
    styleUrls: ['./navigationUser.component.css']
})

export class NavigationUserComponent implements OnInit {

    NavigationExtras: NavigationExtras = {
        state: {}
    }

    constructor(private router: Router) {
        this.recoverData();
    }

    ngOnInit() { }

    recoverData() {
        const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    }

    onGoInicio() {

    }

    onGoComunicacion() {
        this.router.navigate(['/user/comunicacion'], this.NavigationExtras);
    }

    onGoAreasComunales() {
    this.router.navigate(['/user/areasComunes'], this.NavigationExtras);
    }

    onGoFinanzas() {
        this.router.navigate(['/user/finanzas'], this.NavigationExtras);
    }

    onGoAjustes() {
        this.router.navigate(['/user/ajustes'], this.NavigationExtras);
    }

    onLogout(): void {
        this.router.navigate(['/selectUnidad'], this.NavigationExtras)
    }
}
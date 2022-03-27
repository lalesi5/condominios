import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";


@Component({
    selector: 'app-ajustes',
    templateUrl: './ajustes.component.html',
    styleUrls: ['./ajustes.component.css']
})

export class AjustesComponent implements OnInit{

    condominio: any[] = [];

    NavigationExtras: NavigationExtras = {
        state: {}
    }

    constructor(
        private router: Router,
    ) {
      this.recoverData();
    }

    ngOnInit(){

    }

    recoverData(){
      const navigations: any = this.router.getCurrentNavigation()?.extras.state;
      this.condominio = navigations;
      this.NavigationExtras.state = this.condominio;
    }

    onGoAjustesAdmin(){
        this.router.navigate(['/admin/ajustes/ajustesAdmin'], this.NavigationExtras);
    }

    onGoAjustesCondominio(){
        this.router.navigate(['/admin/ajustes/ajustesCondominio'], this.NavigationExtras);
    }

    onGoAjustesAreasComunales(){
        this.router.navigate(['/admin/ajustes/ajustesAreasComunales'], this.NavigationExtras);
    }

    onGoAjustesajustesUnidades(){
        this.router.navigate(['/admin/ajustes/ajustesUnidadesSelectUser'], this.NavigationExtras);
    }

    onGoAjustesUsuarios(){
        this.router.navigate(['/admin/ajustes/ajustesUsuarios'], this.NavigationExtras);
    }
}

import { Component, OnInit } from "@angular/core";  
import { Router, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-ajustesAdminEdit',
    templateUrl: './ajustesAdminEdit.component.html',
    styleUrls: ['./ajustesAdminEdit.component.css']
})

export class AjustesAdminEditComponent implements OnInit{

    admins: any[] = [];

    constructor(
        private router: Router
    ){
        const navigations:any = this.router.getCurrentNavigation()?.extras.state;
        console.log(navigations);
        this.admins = navigations;

        console.log(this.admins);
    }
    ngOnInit(): void {
        
    }

    onBacktoList(): void{
        this.router.navigate(['/admin/ajustes/ajustesAdmin']);
    }
}
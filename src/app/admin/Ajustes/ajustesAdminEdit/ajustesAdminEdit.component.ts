import { Component, OnInit } from "@angular/core";  
import { Router } from '@angular/router';

@Component({
    selector: 'app-ajustesAdminEdit',
    templateUrl: './ajustesAdminEdit.component.html',
    styleUrls: ['./ajustesAdminEdit.component.css']
})

export class AjustesAdminEditComponent implements OnInit{
    constructor(
        private router: Router
    ){
        const navigation = this.router.getCurrentNavigation();
        console.log(navigation?.extras?.state);
    }

    ngOnInit(): void {
        
    }

    onBacktoList(): void{
        this.router.navigate(['/admin/ajustes/ajustesAdmin']);
    }
}
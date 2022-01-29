import { Component, OnInit } from "@angular/core";  
import { Router } from "@angular/router";

@Component({
    selector: 'app-ajustesCondominioEdit',
    templateUrl: './ajustesCondominioEdit.component.html',
    styleUrls: ['./ajustesCondominioEdit.component.css']
})

export class AjustesCondominioEditComponent implements OnInit{
    
    constructor(
        private router: Router
    ){
        
    }

    ngOnInit(): void {
        
    }

    onBacktoList(): void{
        this.router.navigate(['/admin/ajustes/ajustesCondominioEdit']);
    }

}

import { Component, OnInit } from "@angular/core";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-condominios',
    templateUrl: './condominios.component.html',
    styleUrls: ['./condominios.component.css']
})

export class CondominiosComponent implements OnInit{
    
    constructor(private authSvc: AuthService,
        private router: Router
        ){}
    
    ngOnInit(){}

    async onLogout(){
        const user = await this.authSvc.logout();
        this.router.navigate(['/home']);
    }


}
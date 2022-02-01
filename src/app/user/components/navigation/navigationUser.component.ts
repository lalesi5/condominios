import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-navigationUser',
    templateUrl: './navigationUser.component.html',
    styleUrls: ['./navigationUser.component.css']
})

export class NavigationUserComponent implements OnInit{
    constructor(private authSvc: AuthService){}
    
    ngOnInit(){}

    onLogout(): void {
        console.log('esta deslogeando');
        this.authSvc.logout();
    }

    userLogged = this.authSvc.getUserLogged();
}
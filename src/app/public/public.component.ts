import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";

@Component({
    selector: 'app-public',
    templateUrl: './public.component.html',
    styleUrls: ['./public.component.css'],
    providers: [AuthService]
})

export class PublicComponent implements OnInit {
    public isLogged = false;

    constructor(private authSvc: AuthService) { }

    //recupera el usuario
    async ngOnInit() {
        console.log('Login');
        const user = await this.authSvc.getCurrentUser();
        if (user) {
            this.isLogged = true;
            console.log('User->', user);
        }
    }
}
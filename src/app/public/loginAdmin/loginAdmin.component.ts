import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-loginAdmin',
    templateUrl: './loginAdmin.component.html',
    styleUrls: ['./loginAdmin.component.css']
})

export class LoginAdminComponent implements OnInit {

    public isLogged = false;

    loginForm = new FormGroup({
        email: new FormControl,
        password: new FormControl
    })


    constructor(private authSvc: AuthService,
        private router: Router) { }

    ngOnInit() { }

    onLogin() {
        const { email, password } = this.loginForm.value;
        this.authSvc.login(email, password);
        this.router.navigate(['/admin']);
        this.prueba();
    }

    async prueba(){
        console.log('Login');
        const user = await this.authSvc.getCurrentUser();
        if (user) {
            this.isLogged = true;
            console.log('User->', user);
        }
    }

}
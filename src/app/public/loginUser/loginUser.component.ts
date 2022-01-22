import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-loginUser',
    templateUrl: './loginUser.component.html',
    styleUrls: ['./loginuser.component.css']
})

export class LoginUserComponent implements OnInit{
    
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
        this.router.navigate(['/user/home']);
    }

}
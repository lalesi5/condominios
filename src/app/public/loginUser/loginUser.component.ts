import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

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
    

    constructor(){}
    
    ngOnInit(){}

    onLogin(){
        
    }

}
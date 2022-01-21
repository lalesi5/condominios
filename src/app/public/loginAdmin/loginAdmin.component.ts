import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: 'app-loginAdmin',
    templateUrl: './loginAdmin.component.html',
    styleUrls: ['./loginAdmin.component.css']
})

export class LoginAdminComponent implements OnInit{
    
    loginForm = new FormGroup({
        email: new FormControl,
        password: new FormControl
    })
    

    constructor(){}
    
    ngOnInit(){}

    onLogin(){
        
    }

}
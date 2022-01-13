import { Component, OnInit } from "@angular/core";  
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-ajustesAdmin',
    templateUrl: './ajustesAdmin.component.html',
    styleUrls: ['./ajustesAdmin.component.css']
})

export class AjustesAdminComponent implements OnInit{

    adminNombreCuenta!: FormGroup;

    constructor( private router: Router, private fb: FormBuilder ){}
    
    ngOnInit(): void {
        this.initForm();
    }

    onSave(): void{
        console.log('saved', this.adminNombreCuenta.value);
    }

    private initForm(): void {
        this.adminNombreCuenta = this.fb.group({
            nombreCuenta: ['', [Validators.required]]
        });
        console.log(this.adminNombreCuenta);
    }

}
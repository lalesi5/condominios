import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
    selector: 'app-ajustesCondominio',
    templateUrl: './ajustesCondominio.component.html',
    styleUrls: ['./ajustesCondominio.component.css']
})

export class AjustesCondominioComponent implements OnInit{

    createFormGroup(){
        return new FormGroup({
            nombre: new FormControl(''),
            ciudad: new FormControl(''),
            Propietario: new FormControl(''),
            idAdministrador: new FormControl (''),
        });
    }

    contactForm: FormGroup;

    constructor(
        private router: Router
    ){
        this.contactForm = this.createFormGroup();
    }
    
    ngOnInit(){}

    onEdit(): void{
        this.router.navigate(['/admin/ajustes/ajustesCondominioEdit']);
    }
}
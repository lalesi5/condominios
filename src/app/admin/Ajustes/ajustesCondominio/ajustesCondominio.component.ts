import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

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

    constructor(){
        this.contactForm = this.createFormGroup();
    }
    
    ngOnInit(){}
}
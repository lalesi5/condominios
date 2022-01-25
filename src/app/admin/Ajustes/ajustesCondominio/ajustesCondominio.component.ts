import { Component, OnInit } from "@angular/core";
import { CondominiosService } from "src/app/services/condominios.service";
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

    constructor(private cdService: CondominiosService){
        this.contactForm = this.createFormGroup();
    }
    
    ngOnInit(){}
}
import { Component, OnInit } from "@angular/core";
import { CondominiosService } from '../../../services/condominios.service';

@Component({
    selector: 'app-listarCondominios',
    templateUrl: './listarCondominios.component.html',
    styleUrls: ['./listarCondominios.component.css']
})

export class ListarCondominiosComponent implements OnInit{

    condominios: any[] = [];

    constructor(
        private _condominioService: CondominiosService
    ){}
    
    ngOnInit(){
        this.getCondominios();
    }

    getCondominios(){
        this._condominioService
        .getCondominio()
        .subscribe(data => {
            data.forEach((element: any) => {
                this.condominios.push({
                    id: element.payload.doc.id,
                    ...element.payload.doc.data(),
                })
            });
        })
        console.log(this.condominios);
    }

}
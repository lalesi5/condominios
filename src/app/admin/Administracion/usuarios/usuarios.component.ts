import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "src/app/services/user.service";
import { UnidadesComponent } from '../unidades/unidades.component';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit{

    usuarios: any[] = [];

    constructor(private _usuarioService: UsuarioService){}
    
    ngOnInit(){
        this.getEmpleados();
    }

getEmpleados(){
    this._usuarioService.getUser().subscribe(data => {
        data.forEach((element: any) => {
            console.log(element.payload.doc.data().units)
        });
    })
}

}


import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "src/app/services/user.service";


@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

    usuarios: any[] = [];
    unitUsuarios: any[] = [];
    tempo: any[] = [];

    constructor(
        private _usuarioService: UsuarioService
    ) { }

    ngOnInit() {
        this.getUsuario();
    }

    getUsuario() {
        this._usuarioService
            .getUser()
            .subscribe(data => {
                data.forEach((element: any) => {
                    this.usuarios.push({
                        id: element.payload.doc.id,
                        ...element.payload.doc.data(),
                    })
                })
            })
            console.log(this.usuarios);
    }



}


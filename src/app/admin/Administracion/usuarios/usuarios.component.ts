import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "src/app/services/user.service";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { convertToObject } from "typescript";


@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

    usuarios: any[] = [];
    unitsUsers: string[] = [];

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
                    console.log(element.payload.doc.data().units.idUser);
                    this.usuarios.push({
                        id: element.payload.doc.id,
                        ...element.payload.doc.data(),
                    })
                })
            })
    }
}


import { elementEventFullName } from "@angular/compiler/src/view_compiler/view_compiler";
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

    constructor(
        private _usuarioService: UsuarioService
    ) { }

    ngOnInit() {
        this.getUsuario();
        //this.getUnit();
    }

    getUsuario() {
        this._usuarioService
            .getUser()
            .subscribe(data => {
                data.forEach((element: any) => {
                    this.unitUsuarios = element.payload.doc.data().units;
                    this.unitUsuarios.forEach((dataUser: any) => {
                        this.usuarios.push({
                            unitId: dataUser.id,
                            id: element.payload.doc.id,
                            ...element.payload.doc.data(),
                        })                                                
                    })
                })
            })
    }

    // getUnit() {
    //     this._usuarioService
    //     .getUnitUser()
    //     .subscribe(data => {
    //         data.forEach((element: any) => {
    //             console.log(element.payload.doc.data());
    //         });
    //     })
    // }


}


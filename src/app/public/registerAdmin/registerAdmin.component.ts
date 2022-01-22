import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormControl, FormGroup } from "@angular/forms";
import { AdminI } from "src/app/models/administrador";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-registerAdmin',
    templateUrl: './registerAdmin.component.html',
    styleUrls: ['./registerAdmin.component.css']
})

export class RegisterAdminComponent implements OnInit {

    datos: AdminI = {
        address: '',
        email: '',
        last_name: '',
        name: '',
        password: '',
        phone: '',
        rol:'',
        uid: '',
    }

    registerForm = new FormGroup({
        last_name: new FormControl(''),
        name: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
    })

    constructor(private authSvc: AuthService) { }

    ngOnInit() { }

    /**
    * Metodo para registrar usuario
    * guarda el uid del usuario autenticado como dato
    */
    async onRegister() {
        console.log('datos -> ', this.datos);
        const res = await this.authSvc.registerAdmin(this.datos).catch(error => {
            console.log('error');
        })

        if (res) {
            console.log('exito al crear usuario');
            const path = 'admins';
            const id = res.user.uid;
            this.datos.uid = id;
            this.datos.rol = 'administrador';
            this.datos.password = '';
            await this.authSvc.createDoc(this.datos, path, id);
        }
    }
}
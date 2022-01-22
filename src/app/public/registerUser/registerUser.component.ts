import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormControl, FormGroup } from "@angular/forms";
import { UsuarioI } from "src/app/models/usuario";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-registerUser',
    templateUrl: './registerUser.component.html',
    styleUrls: ['./registerUser.component.css']
})

export class RegisterUserComponent implements OnInit {

    datos: UsuarioI = {
        address: '',
        email: '',
        last_name: '',
        name: '',
        password: '',
        phone: '',
        rol: '',
        userId: '',
    }

    registerForm = new FormGroup({
        last_name: new FormControl(''),
        name: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
    })

    constructor(private authSvc: AuthService,
        private firestore: AngularFirestore) { }

    ngOnInit() { }

    /**
    * Metodo para registrar usuario
    * guarda el uid del usuario autenticado como dato
    */
     async onRegister() {
        console.log('datos -> ', this.datos);
        const res = await this.authSvc.registerUsuario(this.datos).catch(error => {
            console.log('error');
        })

        if (res) {
            console.log('exito al crear usuario');
            const path = 'user';
            const id = res.user.uid;
            this.datos.userId = id;
            this.datos.password = '';
            this.datos.rol='usuario';
            await this.authSvc.createDoc(this.datos, path, id);
        }
    }
}
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
        uid: '',
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
        const res = await this.authSvc.register(this.datos).catch(error => {
            console.log('error');
        })

        if (res) {
            console.log('exito al crear usuario');
            const path = 'admins';
            const id = res.user.uid;
            this.datos.uid = id;
            this.datos.password = '';
            await this.createDoc(this.datos, path, id);
        }

    }

    //Metodo para crear la coleccion
    createDoc(data: any, path: string, id: string) {
        const collection = this.firestore.collection(path);
        return collection.doc(id).set(data);
    }
}
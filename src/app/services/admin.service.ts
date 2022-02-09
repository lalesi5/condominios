import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})

export class AdminService {

    constructor(
        public firestore: AngularFirestore,
    ) { }

    getAdministradores() {
        return this.firestore.collection('Administrador')
            .snapshotChanges();
    }

    getAdministradorID(idAdmin: string) {
        return this.firestore.collection('Administrador', ref => ref.where('uid', '==', idAdmin))
            .snapshotChanges();
    }

    saveAdministrador(formulario: any,
        idAdministrador: string,
        emailAdministrador: string,
        passwordAdministrador: string,
        rolAdministrador: string
    ) {
        console.log('Formulario', formulario);
        console.log('Administrador', idAdministrador);
        const uid = idAdministrador;
        const email = emailAdministrador;
        const password = passwordAdministrador;
        const rol = rolAdministrador;
        const data = { uid, email, password, rol, ...formulario }
        return this.firestore.collection('Administrador')
            .doc(idAdministrador)
            .set(data);
    }


}



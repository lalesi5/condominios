import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})

export class AdminService {

    constructor(
        public firestore: AngularFirestore,
    ) { }

    // getAdmin(idAdminLogged: string) {
    //     return this.firestore.collection('admins', ref => ref.where('uid', '==', idAdminLogged)).valueChanges();
    // }

    getAdministrador() {
        return this.firestore.collection('Administrador')
            .snapshotChanges();
    }

    getCondominiosAdministrador(idAdministrador: string) {
        return this.firestore.collection('Administrador')
            .doc(idAdministrador)
            .collection('Condominios')
            .snapshotChanges();
    }

    getAreasComunalesCondominio(idAdministrador: string, idCondominio: string){
        return this.firestore.collection('Administrador')
        .doc(idAdministrador)
        .collection('Condominios')
        .doc(idCondominio)
        .collection('AreasComunales')
        .snapshotChanges();
    }


}



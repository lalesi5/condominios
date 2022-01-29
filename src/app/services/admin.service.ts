import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})

export class AdminService {

    constructor(
        public firestore: AngularFirestore,
    ) { }

    getAdmin(idAdminLogged: string) {
        return this.firestore.collection('admins', ref => ref.where('uid', '==', idAdminLogged)).valueChanges();
    }

    getAdministrador() {
        return this.firestore.collection('Administrador')
            .snapshotChanges();
    }

    getCondominiosAdministrador() {
        return this.firestore.collection('Administrador')
            .doc('venAdVbQzj8AtFR3FYCI')
            .collection('Condominios')
            .snapshotChanges();
    }

    getAreasComunalesCondominio(){
        return this.firestore
    }


}



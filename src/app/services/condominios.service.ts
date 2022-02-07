import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})

export class CondominioService {

    constructor(
        public firestore: AngularFirestore,
    ) { }


    getCondominios(idAdministrador: string) {
        return this.firestore.collection('Condominios',
            ref => ref.where('idAdministrador', '==', idAdministrador))
            .snapshotChanges();
    }



    deleteCondominios(idCondominio: string) {
        return this.firestore.collection('Condominios')
            .doc(idCondominio)
            .delete();
    }


    saveCondominios(condominio: any, idAdmin: string, idCondo?: string){
        
        const idAdministrador = idAdmin;
        const idCondominio = idCondo || this.firestore.createId();
        const data = {idAdministrador, idCondominio, ...condominio}
        return this.firestore.collection('Condominios')
        .doc(idCondominio)
        .set(data);

    }




}
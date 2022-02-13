import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})

export class UnidadesService {


    constructor(
        public firestore: AngularFirestore,
    ) { }

    getUnidadesById(idUni: string){
        return this.firestore.collection('Unidades', ref => ref.where('idUnidad', '==', idUni))
        .snapshotChanges();
    }

    getAllUnidades(idCondo: string){
        return this.firestore.collection('Unidades', ref => ref.where('idCondominio', '==', idCondo))
        .snapshotChanges();
    }

    deleteUnidades(idUni: string){
        return this.firestore.collection('Unidades')
        .doc(idUni)
        .delete();
    }

    saveUnidades(unidad: any, idAdmin: string, idCondo: string, idUni?: string){
        const idAdministrador = idAdmin;
        const idCondominio = idCondo;
        const idUnidad = idUni || this.firestore.createId();
        const data = {idAdministrador, idCondominio, idUnidad, ...unidad}
        return this.firestore.collection('Unidades')
        .doc(idUnidad)
        .set(data);
    }

}

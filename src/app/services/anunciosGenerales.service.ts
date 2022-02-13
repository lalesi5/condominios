import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})

export class AnunciosGeneralesService {

    constructor(
        public firestore: AngularFirestore,
    ) { }

    getAnunciosGenerales(idCondo: string) {
        return this.firestore.collection('AnunciosGenerales', ref => ref.where('idCondominio', '==', idCondo))
            .snapshotChanges();
    }

    deleteAnunciosGenerales(idAnuncioGeneral: string) {
        return this.firestore.collection('AnunciosGenerales')
            .doc(idAnuncioGeneral)
            .delete();
    }

    saveAnunciosGenerales(anuncioGeneral: any, idAdmin: string, idCondo: string, idAnuncioGene?: string) {
        const idAdministrador = idAdmin;
        const idCondominio = idCondo;
        const idAnuncioGeneral = idAnuncioGene || this.firestore.createId();
        const data = { idAdministrador, idCondominio, idAnuncioGeneral, ...anuncioGeneral }
        return this.firestore.collection('AnunciosGenerales')
            .doc(idAnuncioGeneral)
            .set(data);
    }
}
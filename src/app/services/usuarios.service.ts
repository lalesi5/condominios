import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})

export class UsuariosService {


    constructor(
        public firestore: AngularFirestore,
    ) { }

    saveUsuario(usuario: any, idAdmin: string, idCondo: string, idUni: string, idUser?: string){
        const idAdministrador = idAdmin;
        const idCondominio = idCondo;
        const idUnidad = idUni;
        const idUsuario = idUser || this.firestore.createId();
        const data = {idAdministrador, idCondominio, idUnidad, idUsuario, ...usuario}
        return this.firestore.collection('Usuarios')
        .doc(idUnidad)
        .set(data);
    }

}
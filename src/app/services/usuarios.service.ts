import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UsuariosService {

    constructor(public firestore: AngularFirestore) { }

    agregarUsuario(usuario: any, idUser: string): Promise<any> {
        const idUsuario = idUser || this.firestore.createId();
        return this.firestore.collection('Administrador').doc(idUser).set(usuario);
    }

    getUsuarios(idCondominio: string): Observable<any> {
        return this.firestore.collection('Administrador', ref => ref.where('idCondominio', '==', idCondominio).orderBy('name','asc')).snapshotChanges();
    }

    saveUsuario(usuario: any, idAdmin: string, idCondo: string, idUni: string, idUser?: string) {
        const idAdministrador = idAdmin;
        const idCondominio = idCondo;
        const idUnidad = idUni;
        const idUsuario = idUser || this.firestore.createId();
        const data = { idAdministrador, idCondominio, idUnidad, idUsuario, ...usuario }
        return this.firestore.collection('Usuarios')
            .doc(idUnidad)
            .set(data);
    }

}
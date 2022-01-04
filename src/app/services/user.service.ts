import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore"
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor(private firestore: AngularFirestore) { }

    getUser(): Observable<any> {
        return this.firestore.collection('user').snapshotChanges();
    }

    getUnitUser(): Observable<any> {
        return this.firestore.collection('unit').snapshotChanges();
    }
}

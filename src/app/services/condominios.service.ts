import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CondominiosService {

    constructor(private firestore: AngularFirestore) { }

    getCondominio(): Observable<any> {
        return this.firestore.collection('condominium').snapshotChanges();
    }
}

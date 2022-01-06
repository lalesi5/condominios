import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private firestore: AngularFirestore) { }

    getAdmin(): Observable<any> {
        return this.firestore.collection('admin').snapshotChanges();
    }

}

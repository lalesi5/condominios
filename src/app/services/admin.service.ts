import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    administradores!: Observable<any>;
    private administradoresCollection!: AngularFirestoreCollection<any>;

    constructor(private readonly firestore: AngularFirestore) { 
        this.administradoresCollection = firestore.collection<any>('admin');

    }


}

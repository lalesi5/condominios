import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"
import { AdminI } from "../models/administrador";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    administradores!: Observable<any>;
    private administradoresCollection!: AngularFirestoreCollection<AdminI>;

    constructor(private readonly firestore: AngularFirestore) { 

    }


}

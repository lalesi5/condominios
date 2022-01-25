import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from "rxjs";
import { CondominioInterface } from '../models/condominio.interface';

@Injectable({
    providedIn: 'root'
})
export class CondominiosService {

    private condominiosCollection: AngularFirestoreCollection<CondominioInterface> | undefined;

    constructor(private firestore: AngularFirestore) { 

        this.condominiosCollection = firestore.collection<CondominioInterface>('condominium')

    }

    addCondominio(newCondominio: CondominioInterface): void{
        this.condominiosCollection?.add(newCondominio);
    }

    getCondominio(): Observable<any> {
        return this.firestore.collection('condominium').snapshotChanges();
    }
}

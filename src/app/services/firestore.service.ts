import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database: AngularFirestore) { }

  createDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc<tipo>(path: string, id: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  getAllUsuarios(idCondo: string) {
    return this.database.collection(
      'Administrador',
        ref => ref.where(
          'idCondominio',
          '==', idCondo))
      .snapshotChanges();
  }

  getAll(path:string, idCampo: string, idBusqueda:string) {
    return this.database.collection(path, ref => ref.where(idCampo, '==', idBusqueda))
      .snapshotChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }

  getId() {
    return this.database.createId();
  }
}

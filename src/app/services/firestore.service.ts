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

  createDocData(condominio: any, path: string,idAdmin: string){
    //console.log(idCondo);
    const idAdministrador = idAdmin;
    const idCondominio =  this.database.createId();
    const data = {idAdministrador, idCondominio, ...condominio}
    const collection = this.database.collection(path)
    return collection.doc(idCondominio).set(data);
}

  getDoc<tipo>(path: string, id: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  //si no se usa borrar este metodo getAll parametrizado ya esta parametrizado
  getAllUsuarios(idCondo: string) {
    return this.database.collection(
      'Administrador',
        ref => ref.where(
          'idCondominio',
          '==', idCondo))
      .snapshotChanges();
  }

  //Busca informacion en el documento con alguna condicion
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

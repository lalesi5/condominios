import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CondominioService {

  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getCondominios(idAdministrador: string) {
    return this.firestore.collection(
      'Condominios',
      ref => ref.where(
        'idAdministrador',
        '==', idAdministrador))
      .snapshotChanges();
  }

  /*getCondominiosID(idCondominio: string) {
    return this.firestore.collection(
      'Condominios',
      ref => ref.where(
        'idCondominio',
        '==', idCondominio))
      .snapshotChanges();
  }*/

  getCondominiosID(idCondominio: string): Observable<any> {
    return this.firestore.collection('Condominios', ref => ref.where('idCondominio', '==', idCondominio)).snapshotChanges();
  }

  deleteCondominios(idCondominio: string) {
    return this.firestore.collection(
      'Condominios')
      .doc(idCondominio)
      .delete();
  }

  saveCondominios(condominio: any, idAdmin: string) {
    const idAdministrador = idAdmin;
    const idCondominio = this.firestore.createId();
    const data = {idAdministrador, idCondominio, ...condominio}
    return this.firestore.collection(
      'Condominios')
      .doc(idCondominio)
      .set(data);
  }

  /*updateCondominios(condominio: any, idAdmin: string, idCondo: string) {
    const idAdministrador = idAdmin;
    const idCondominio = idCondo;
    const data = {idAdministrador, idCondominio, ...condominio}
    return this.firestore.collection(
      'Condominios')
      .doc(idCondominio)
      .update(data);
  }*/

  updateCondominios(id: string, data: any): Promise<any> {
    return this.firestore.collection('Condominios').doc(id).update(data);
  }

}

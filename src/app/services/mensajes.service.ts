import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})

export class MensajesService {

  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getMensajes(idUser: string) {
    return this.firestore.collection(
      'Mensajes',
      ref => ref.where(
        'idUsuario',
        '==', idUser)
        .orderBy('fechaMensaje', 'desc'))
      .snapshotChanges();
  }

  guardarMensaje(mensaje: any) {
    const idMensaje = this.firestore.createId();
    const data = { idMensaje, ...mensaje }
    return this.firestore.collection('Mensajes').doc(idMensaje).set(data);
  }

  updateMensajes(mensaje: any,
    idAdmin: string,
    idCondo: string,
    idAnuncioGene: string) {
    const idAdministrador = idAdmin;
    const idCondominio = idCondo;
    const idMensaje = idAnuncioGene;
    const data = { idAdministrador, idCondominio, idMensaje, ...mensaje }
    return this.firestore.collection(
      'Mensajes')
      .doc(idMensaje)
      .update(data);
  }

}

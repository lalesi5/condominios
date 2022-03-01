import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})

export class MensajesService {

  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getMensajes(idUni: string) {
    return this.firestore.collection(
      'Mensajes',
      ref => ref.where(
        'idUnidad',
        '==', idUni))
      .snapshotChanges();
  }

}

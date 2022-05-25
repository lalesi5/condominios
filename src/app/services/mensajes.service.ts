import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MensajesService {

  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getMensajes(idUser: string, idUnidad: string): Observable<any> {
    return this.firestore.collection('Mensajes', ref => ref.where('idUsuario', '==', idUser).where('idUnidad', '==', idUnidad)
      .orderBy('fechaMensaje', 'desc'))
      .snapshotChanges();
  }

  getMensaje(id: string): Observable<any> {
    return this.firestore.collection('Mensajes').doc(id).snapshotChanges();
  }

  guardarMensaje(mensaje: any) {
    const idMensaje = this.firestore.createId();
    const data = {idMensaje, ...mensaje}
    return this.firestore.collection('Mensajes').doc(idMensaje).set(data);
  }

  updateMensajes(id: string, data: any): Promise<any> {
    return this.firestore.collection('Mensajes').doc(id).update(data);
  }

  eliminarMensaje(id: string): Promise<any> {
    return this.firestore.collection('Mensajes').doc(id).delete();
  }
}

import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(
    public firestore: AngularFirestore,
  ) { }

  getAdministradorID(id: string): Observable<any> {
    return this.firestore.collection('Administrador', ref => ref.where('idAdministrador', '==', id).where('rol', '==', 'Administrador')).snapshotChanges();
  }

  getUserID(id: string): Observable<any> {
    return this.firestore.collection('Administrador', ref => ref.where('idUsuario', '==', id).where('rol', '==', 'Usuario')).snapshotChanges();
  }

  getAdministrador(id: string): Observable<any> {
    return this.firestore.collection('Administrador').doc(id).snapshotChanges();
  }

  getUsuarioID(idUser: string) {
    return this.firestore.collection(
      'Administrador',
      ref => ref.where(
        'idUsuario',
        '==', idUser))
      .snapshotChanges();
  }

  updateAdministrador(id: string, data: any): Promise<any> {
    return this.firestore.collection('Administrador').doc(id).update(data);
  }

  deleteAdministrador(idAdministrador: string) {
    return this.firestore.collection(
      'Administrador')
      .doc(idAdministrador)
      .delete();
  }

}



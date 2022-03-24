import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  constructor(public firestore: AngularFirestore) {
  }

  agregarUsuario(usuario: any, idUser: string): Promise<any> {
    const idUsuario = idUser || this.firestore.createId();
    return this.firestore.collection('Administrador').doc(idUsuario).set(usuario);
  }

  getUsuarios(idCondominio: string): Observable<any> {
    return this.firestore.collection('Administrador', ref => ref.where('idCondominio', '==', idCondominio).orderBy('name', 'asc')).snapshotChanges();
  }

  getUsuariosID(idUser: string): Observable<any> {
    return this.firestore.collection('Administrador', ref => ref.where('idUsuario', '==', idUser)).snapshotChanges();
  }

  getUsuario(id: string): Observable<any> {
    return this.firestore.collection('Administrador').doc(id).snapshotChanges();
  }

  eliminarUsuario(id: string): Promise<any> {
    return this.firestore.collection('Administrador').doc(id).delete();
  }

  actualizarUsuario(id: string, data: any): Promise<any> {
    return this.firestore.collection('Administrador').doc(id).update(data);
  }
}

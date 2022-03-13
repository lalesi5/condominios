import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getAdministradorID(idAdmin: string) {
    return this.firestore.collection(
      'Administrador',
      ref => ref.where(
        'idAdministrador',
        '==', idAdmin).where('rol', '==', 'Administrador'))
      .snapshotChanges();
  }

  getUsuarioID(idUser: string) {
    return this.firestore.collection(
      'Administrador',
      ref => ref.where(
        'idUsuario',
        '==', idUser))
      .snapshotChanges();
  }

  saveAdministrador(formulario: any,
                    idAdministrador: string,
                    emailAdministrador: string,
                    passwordAdministrador: string,
                    rolAdministrador: string
  ) {
    const email = emailAdministrador;
    const password = passwordAdministrador;
    const rol = rolAdministrador;
    const data = {idAdministrador, email, password, rol, ...formulario}
    return this.firestore.collection(
      'Administrador')
      .doc(idAdministrador)
      .update(data);
  }

  deleteAdministrador(idAdministrador: string) {
    return this.firestore.collection(
      'Administrador')
      .doc(idAdministrador)
      .delete();
  }

}



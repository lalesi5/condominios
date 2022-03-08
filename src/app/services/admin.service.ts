import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

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
        '==', idAdmin).where('rol', '==', 'administrador'))
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
    const data = { idAdministrador, email, password, rol, ...formulario }
    return this.firestore.collection(
      'Administrador')
      .doc(idAdministrador)
      .update(data);
  }


}



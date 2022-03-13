import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})

export class UnidadesService {


  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getUnidadesById(idUni: string) {
    return this.firestore.collection('Unidades', ref => ref.where('idUnidad', '==', idUni))
      .snapshotChanges();
  }

  getAllUnidades(idCondo: string) {
    return this.firestore.collection('Unidades', ref => ref.where('idCondominio', '==', idCondo))
      .snapshotChanges();
  }

  getAllUnidadesIdUser(idUser: string) {
    return this.firestore.collection('Unidades', ref => ref.where('idUsuario', '==', idUser))
      .snapshotChanges();
  }

  getAllUnidadesOrdenadas(idCondo: string) {
    return this.firestore.collection('Unidades', ref => ref.where('idCondominio', '==', idCondo).orderBy("numeroUnidad"))
      .snapshotChanges();
  }

  deleteUnidades(idUni: string) {
    return this.firestore.collection('Unidades')
      .doc(idUni)
      .delete();
  }

  createUnidades(unidad: any, idAdmin: string, idCondo: string, idUser: string) {
    const idAdministrador = idAdmin;
    const idCondominio = idCondo;
    const idUsuario = idUser;
    const idUnidad = this.firestore.createId();
    const data = {idAdministrador, idCondominio, idUsuario, idUnidad, ...unidad}
    return this.firestore.collection('Unidades')
      .doc(idUnidad)
      .set(data);
  }

  updateUnidades(unidad: any, idAdmin: string, idCondo: string, idUser: string, idUni?: string) {
    const idAdministrador = idAdmin;
    const idCondominio = idCondo;
    const idUsuario = idUser;
    const idUnidad = idUni || this.firestore.createId();
    const data = {idAdministrador, idCondominio, idUsuario, idUnidad, ...unidad}
    return this.firestore.collection('Unidades')
      .doc(idUnidad)
      .update(data);
  }

}

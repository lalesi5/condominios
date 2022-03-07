import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})

export class AreasComunalesService {


  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getAreasComunales(idCondo: string) {
    return this.firestore.collection(
      'AreasComunales',
      ref => ref.where(
        'idCondominio',
        '==', idCondo))
      .snapshotChanges();
  }

  getAreasComunalesID(idAreaComun: string) {
    return this.firestore.collection(
      'AreasComunales',
      ref => ref.where(
        'idAreaComunal',
        '==', idAreaComun))
      .snapshotChanges();
  }

  deleteAreasComunales(idAreaComunal: string) {
    return this.firestore.collection(
      'AreasComunales')
      .doc(idAreaComunal)
      .delete();
  }

  saveAreasComunales(areaComunal: any,
                     idAdmin: string,
                     idCondo: string,
  ) {
    const idAdministrador = idAdmin;
    const idCondominio = idCondo;
    const idAreaComunal = this.firestore.createId();
    const data = {idAdministrador, idCondominio, idAreaComunal, ...areaComunal}
    return this.firestore.collection(
      'AreasComunales')
      .doc(idAreaComunal)
      .set(data);
  }

  updateAreasComunales(areaComunal: any,
                       idAdmin: string,
                       idCondo: string,
                       idAreaComuna?: string) {
    const idAdministrador = idAdmin;
    const idCondominio = idCondo;
    const idAreaComunal = idAreaComuna;
    const data = {idAdministrador, idCondominio, idAreaComunal, ...areaComunal}
    return this.firestore.collection(
      'AreasComunales')
      .doc(idAreaComunal)
      .update(data);
  }

}

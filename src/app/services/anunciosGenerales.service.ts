import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})

export class AnunciosGeneralesService {

  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getAnunciosGenerales(idCondo: string) {
    return this.firestore.collection(
      'AnunciosGenerales',
      ref => ref.where(
        'idCondominio',
        '==', idCondo)
        .orderBy('fechaAnuncio', 'desc'))
      .snapshotChanges();
  }

  getAnuncioGeneral(idAnunG: string) {
    return this.firestore.collection(
      'AnunciosGenerales',
      ref => ref.where(
        'idAnuncioGeneral',
        '==', idAnunG))
      .snapshotChanges();
  }

  deleteAnunciosGenerales(idAnuncioGeneral: string) {
    return this.firestore.collection(
      'AnunciosGenerales')
      .doc(idAnuncioGeneral)
      .delete();
  }

  saveAnunciosGenerales(anuncioGeneral: any,
                        idAdmin: string,
                        idCondo: string,
  ) {
    const idAdministrador = idAdmin;
    const idCondominio = idCondo;
    const idAnuncioGeneral = this.firestore.createId();
    const data = {idAdministrador, idCondominio, idAnuncioGeneral, ...anuncioGeneral}
    return this.firestore.collection(
      'AnunciosGenerales')
      .doc(idAnuncioGeneral)
      .set(data);
  }

  updateAnunciosGenerales(anuncioGeneral: any,
                          idAdmin: string,
                          idCondo: string,
                          idAnuncioGene: string) {
    const idAdministrador = idAdmin;
    const idCondominio = idCondo;
    const idAnuncioGeneral = idAnuncioGene;
    const data = {idAdministrador, idCondominio, idAnuncioGeneral, ...anuncioGeneral}
    return this.firestore.collection(
      'AnunciosGenerales')
      .doc(idAnuncioGeneral)
      .update(data);
  }
}

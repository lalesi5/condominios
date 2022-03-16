import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AnunciosGeneralesService {

  constructor(
    public firestore: AngularFirestore,
  ) { }

  getAnunciosGenerales(idCondominio: string): Observable<any> {
    return this.firestore.collection('AnunciosGenerales', ref => ref.where('idCondominio', '==', idCondominio).orderBy('fechaAnuncio', 'desc')).snapshotChanges();
  }

  getAnuncioGeneral(id: string): Observable<any> {
    return this.firestore.collection('AnunciosGenerales').doc(id).snapshotChanges();
  }

  deleteAnunciosGenerales(id: string): Promise<any> {
    return this.firestore.collection('AnunciosGenerales').doc(id).delete();
  }

  saveAnunciosGenerales(anuncioGeneral: any): Promise<any> {
    const idAnuncioGeneral = this.firestore.createId();
    const data = { idAnuncioGeneral, ...anuncioGeneral }
    return this.firestore.collection(
      'AnunciosGenerales')
      .doc(idAnuncioGeneral)
      .set(data);
  }

  updateAnunciosGenerales(id: string, data: any): Promise<any> {
    return this.firestore.collection('AnunciosGenerales').doc(id).update(data);
  }
}

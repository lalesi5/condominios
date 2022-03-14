import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AreasComunalesService {

  constructor(
    public firestore: AngularFirestore,
  ) { }

  getAreasComunales(idCondominio: string): Observable<any> {
    return this.firestore.collection('AreasComunales', ref => ref.where('idCondominio', '==', idCondominio).orderBy('nombre', 'asc')).snapshotChanges();
  }

  getArea(id: string): Observable<any> {
    return this.firestore.collection('AreasComunales').doc(id).snapshotChanges();
  }

  deleteAreasComunales(id: string): Promise<any> {
    return this.firestore.collection('AreasComunales').doc(id).delete();
  }

  saveAreasComunales(areaComunal: any,
    idAdmin: string,
    idCondo: string,
  ): Promise<any> {
    const idAdministrador = idAdmin;
    const idCondominio = idCondo;
    const idAreaComunal = this.firestore.createId();
    const data = { idAdministrador, idCondominio, idAreaComunal, ...areaComunal }
    return this.firestore.collection(
      'AreasComunales')
      .doc(idAreaComunal)
      .set(data);
  }

  actualizarArea(id: string, data: any): Promise<any> {
    return this.firestore.collection('AreasComunales').doc(id).update(data);
  }
}

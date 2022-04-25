import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class IngresoUnidadesService {

  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getPagos(idUnidad: string): Observable<any>{
    return this.firestore.collection('IngresoUnidades', ref => ref.where('idUnidad', '==',idUnidad)).snapshotChanges();
  }

  getPago(id: string): Observable<any> {
    return this.firestore.collection('IngresoUnidades').doc(id).snapshotChanges();
  }

  savePago(datosPago: any) {
    const idPago = this.firestore.createId();
    const data = {idPago, ...datosPago}
    return this.firestore.collection('IngresoUnidades').doc(idPago).set(data);
  }

  updatePago(id: string, data: any): Promise <any>{
    return this.firestore.collection('IngresoUnidades').doc(id).update(data);
  }

  deletePago(id: string): Promise<any> {
    return this.firestore.collection('IngresoUnidades').doc(id).delete();
  }

}

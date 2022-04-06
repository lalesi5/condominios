import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MensajesService {

  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getPagos(){

  }

  getPago(id: string): Observable<any> {
    return this.firestore.collection('Pagos').doc(id).snapshotChanges();
  }

  savePago(datosPago: any) {
    const idPago = this.firestore.createId();
    const data = {idPago, ...datosPago}
    return this.firestore.collection('Pagos').doc(idPago).set(data);
  }

  updatePago(id: string, data: any): Promise <any>{
    return this.firestore.collection('Pagos').doc(id).update(data);
  }

  deletePago(id: string): Promise<any> {
    return this.firestore.collection('Pagos').doc(id).delete();
  }

}

import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TiposPagoService {

  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getTiposPago(idCondominio: string): Observable<any> {
    return this.firestore.collection('TiposPagos', ref => ref.where('idCondominio', '==', idCondominio)).snapshotChanges();
  }

  getTipoPago(id: string): Observable<any> {
    return this.firestore.collection('TiposPagos').doc(id).snapshotChanges();
  }

  saveTipoPago(datosTipoPago: any,
             idAdmin: string,
             idCondo: string
  ): Promise<any> {
    const idAdministrador = idAdmin;
    const idCondominio = idCondo;
    const idTipoPago = this.firestore.createId();
    const data = {idAdministrador,idCondominio,idTipoPago, ...datosTipoPago}
    return this.firestore.collection('TiposPagos').doc(idTipoPago).set(data);
  }

  updateTipoPago(id: string, data: any): Promise <any>{
    return this.firestore.collection('TiposPagos').doc(id).update(data);
  }

  deleteTipoPago(id: string): Promise<any> {
    return this.firestore.collection('TiposPagos').doc(id).delete();
  }

}

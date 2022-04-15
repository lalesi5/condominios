import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DescuentosService {

  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getDescuentos(idCondominio: string): Observable<any> {
    return this.firestore.collection('Descuentos', ref => ref.where('idCondominio', '==', idCondominio)).snapshotChanges();
  }

  getDescuento(id: string): Observable<any> {
    return this.firestore.collection('Descuentos').doc(id).snapshotChanges();
  }

  saveDescuento(datosDescuento: any,
             idAdmin: string,
             idCondo: string
  ): Promise<any> {
    const idAdministrador = idAdmin;
    const idCondominio = idCondo;
    const idDescuento = this.firestore.createId();
    const data = {idAdministrador,idCondominio,idDescuento, ...datosDescuento}
    return this.firestore.collection('Descuentos').doc(idDescuento).set(data);
  }

  updateDescuento(id: string, data: any): Promise <any>{
    return this.firestore.collection('Descuentos').doc(id).update(data);
  }

  deleteDescuento(id: string): Promise<any> {
    return this.firestore.collection('Descuentos').doc(id).delete();
  }

}

import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CuentasService {

  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getCuentas(idCondominio: string): Observable<any> {
    return this.firestore.collection('Cuentas', ref => ref.where('idCondominio', '==', idCondominio)).snapshotChanges();
  }

  getCuenta(id: string): Observable<any> {
    return this.firestore.collection('Cuentas').doc(id).snapshotChanges();
  }

  saveCuenta(datosCuenta: any,
    idAdmin: string,
    idCondo: string
  ): Promise<any> {
    const idAdministrador = idAdmin;
    const idCondominio = idCondo;
    const idCuenta = this.firestore.createId();
    const data = {idAdministrador,idCondominio,idCuenta, ...datosCuenta}
    return this.firestore.collection('Cuentas').doc(idCuenta).set(data);
  }

  updateCuenta(id: string, data: any): Promise <any>{
    return this.firestore.collection('Cuentas').doc(id).update(data);
  }

  deleteCuenta(id: string): Promise<any> {
    return this.firestore.collection('Cuentas').doc(id).delete();
  }

}

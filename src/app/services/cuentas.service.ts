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

  getPagos(){

  }

  getCuenta(id: string): Observable<any> {
    return this.firestore.collection('Cuentas').doc(id).snapshotChanges();
  }

  saveCuenta(datosCuenta: any) {
    const idCuenta = this.firestore.createId();
    const data = {idCuenta, ...datosCuenta}
    return this.firestore.collection('Cuentas').doc(idCuenta).set(data);
  }

  updateCuenta(id: string, data: any): Promise <any>{
    return this.firestore.collection('Cuentas').doc(id).update(data);
  }

  deleteCuenta(id: string): Promise<any> {
    return this.firestore.collection('Cuentas').doc(id).delete();
  }

}

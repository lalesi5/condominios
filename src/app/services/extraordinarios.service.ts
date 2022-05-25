import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class extraordinariosService {

  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getExtraordinarios(idCondominio: string): Observable<any>{
    return this.firestore.collection('IngresoExtraordinarios', ref => ref.where('idCondominio', '==', idCondominio).where('estadoIngreso', '==', 'Activo' )).snapshotChanges();
  }

  getExtraordinario(id:string): Observable<any>{
    return this.firestore.collection('IngresoExtraordinarios').doc(id).snapshotChanges();
  }

  saveExtraordinario(datosExtraordinario: any){
    const idExtraordinario = this.firestore.createId();
    const data = {idExtraordinario, ...datosExtraordinario}
    return this.firestore.collection('IngresoExtraordinarios').doc(idExtraordinario).set(data);
  }

  updateExtraordinario(id: string, data:any): Promise<any>{
    return this.firestore.collection('IngresoExtraordinarios').doc(id).update(data);
  }

  deleteExtraordinario(id: string): Promise<any>{
    return this.firestore.collection('IngresoExtraordinarios').doc(id).delete();
  }

}

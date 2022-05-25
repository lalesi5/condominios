import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class egresosService {

  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getEgresos(idCondominio: string): Observable<any>{
    return this.firestore.collection('Egreso', ref => ref.where('idCondominio', '==', idCondominio).where('estadoIngreso', '==', 'Activo' )).snapshotChanges();
  }

  getEgreso(id:string): Observable<any>{
    return this.firestore.collection('Egreso').doc(id).snapshotChanges();
  }

  saveEgreso(datosExtraordinario: any){
    const idExtraordinario = this.firestore.createId();
    const data = {idExtraordinario, ...datosExtraordinario}
    return this.firestore.collection('Egreso').doc(idExtraordinario).set(data);
  }

  updateEgreso(id: string, data:any): Promise<any>{
    console.log(data);
    return this.firestore.collection('Egreso').doc(id).update(data);
  }

  deleteEgreso(id: string): Promise<any>{
    return this.firestore.collection('Egreso').doc(id).delete();
  }

}

import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TablaCobranzaService {
  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getTablaCobranzasById(idTabla: string): Observable<any> {
    return this.firestore.collection('TablaCobranzas', ref => ref.where('idTablaCobranzas', '==', idTabla))
      .snapshotChanges();
  }

  getTablaCobranzasByUnidad(idUnidad: string): Observable<any> {
      return this.firestore.collection('TablaCobranzas', ref => ref.where('idUnidad', '==', idUnidad))
        .snapshotChanges();
  }

  getTablaCobranzasByCondominio(idCondominio: string): Observable<any> {
    return this.firestore.collection('TablaCobranzas', ref => ref.where('idCondominio', '==', idCondominio))
      .snapshotChanges();
  }

  createTablaCobranzas(tabla: any): Promise <any>{
    const idTablaCobranzas  = this.firestore.createId();
    const data = {idTablaCobranzas, ...tabla}
    return this.firestore.collection('TablaCobranzas').doc(idTablaCobranzas).set(data);
  }

  actualizarTablaCobranzas(id: string, data:any): Promise<any>{
    return this.firestore.collection('TablaCobranzas').doc(id).update(data);
  }
}

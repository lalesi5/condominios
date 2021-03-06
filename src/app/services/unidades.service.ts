import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UnidadesService {


  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  getUnidadesById(idUni: string) {
    return this.firestore.collection('Unidades', ref => ref.where('idUnidad', '==', idUni))
      .snapshotChanges();
  }

  //para recuperar en el componente editar
  getUnidad(id: string): Observable<any> {
    return this.firestore.collection('Unidades').doc(id).snapshotChanges();
  }

  getAllUnidades(idCondo: string) {
    return this.firestore.collection('Unidades', ref => ref.where('idCondominio', '==', idCondo).orderBy('unidad', 'asc'))
      .snapshotChanges();
  }

  getAllUnidadesIdUser(idUser: string): Observable<any> {
    return this.firestore.collection('Unidades', ref => ref.where('idUsuario', '==', idUser))
      .snapshotChanges();
  }

  getAllUnidadesOrdenadas(idCondo: string) {
    return this.firestore.collection('Unidades', ref => ref.where('idCondominio', '==', idCondo))
      .snapshotChanges();
  }

  deleteUnidades(id: string): Promise<any> {
    return this.firestore.collection('Unidades').doc(id).delete();
  }

  createUnidades(unidad: any): Promise<any> {
    const idUnidad = this.firestore.createId();
    sessionStorage.setItem('idUnidad', idUnidad)
    const data = { idUnidad, ...unidad }
    return this.firestore.collection('Unidades').doc(idUnidad).set(data);

  }

  actualizarUnidad(id: string, data: any): Promise<any> {
    return this.firestore.collection('Unidades').doc(id).update(data);
  }

}

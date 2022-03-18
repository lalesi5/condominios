import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ReservasService {

  constructor(public firestore: AngularFirestore) {
  }

  agregarReserva(reserva: any, idReser:string): Promise<any> {
    const idReserva = idReser || this.firestore.createId();
    return this.firestore.collection('Reservas').doc(idReserva).set(reserva);
  }

  getReserva(idCondominio: string): Observable<any> {
    return this.firestore.collection('Reservas', ref => ref.where('idCondominio','==', idCondominio).orderBy('fechaReserva', 'desc')).snapshotChanges();
  }

  eliminarReserva(idReser: string): Promise<any>{
    return this.firestore.collection('Reservas').doc(idReser).delete();
  }

  actualizarReserva(idReser: string, data: any): Promise<any> {
    return this.firestore.collection('Reservas').doc(idReser).update(data);
  }

}

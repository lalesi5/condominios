import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ReservasService {

  constructor(public firestore: AngularFirestore) {
  }

  agregarReserva(reserva: any): Promise<any> {
    const idReserva = this.firestore.createId();
    const data = { idReserva, ...reserva}
    return this.firestore.collection('Reservas').doc(idReserva).set(data);
  }

  getReserva(idAreaComun: string): Observable<any> {
    return this.firestore.collection('Reservas', ref => ref.where('idAreaComunal','==', idAreaComun).orderBy('fechaReservaInicio', 'desc')).snapshotChanges();
  }

  getReservaIdUnit(idAreaComun: string, idUnit: string): Observable<any> {
    return this.firestore.collection('Reservas', ref => ref.where('idAreaComunal','==', idAreaComun).where('idUnidad', '==', idUnit).orderBy('fechaReservaInicio', 'desc')).snapshotChanges();
  }

  eliminarReserva(idReser: string): Promise<any>{
    return this.firestore.collection('Reservas').doc(idReser).delete();
  }

  actualizarReserva(idReser: string, data: any): Promise<any> {
    return this.firestore.collection('Reservas').doc(idReser).update(data);
  }

  getReservas(idCondo:string): Observable<any> {
    return this.firestore.collection('Reservas', ref => ref.where('idCondominio', '==', idCondo).where('estadoReserva', '==', 'Pendiente').orderBy('numeroUnidad', 'desc')).snapshotChanges();
  }

}

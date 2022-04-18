import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ReservasService {

  constructor(public firestore: AngularFirestore) {
  }

  agregarReserva(reserva: any): Promise<any> {
    const idReserva = this.firestore.createId();
    const data = { idReserva, ...reserva }
    return this.firestore.collection('Reservas').doc(idReserva).set(data);
  }

  getReservaId(id: string): Observable<any> {
    return this.firestore.collection('Reservas').doc(id).snapshotChanges();
  }

  getReservasEnCondominio(id: string): Observable<any> {
    return this.firestore.collection('Reservas', ref => ref.where('idCondominio', '==', id)).snapshotChanges();
  }

  getReservasEnCondominioPendientes(id: string): Observable<any> {
    return this.firestore.collection('Reservas', ref => ref.where('idCondominio', '==', id).where('estadoReserva', '==', 'Pendiente')).snapshotChanges();
  }

  getReservasValorPago(idUnidad: string): Observable<any>{
    return this.firestore.collection('Reservas', ref => ref.where('idUnidad', '==', idUnidad).where('pagoReserva', '==', 'Por Pagar')).snapshotChanges();
  }

  getReservasUsuario(id: string, idUnidad: string): Observable<any> {
    return this.firestore.collection('Reservas', ref => ref.where('idCondominio', '==', id)
    .where('idUnidad', '==', idUnidad)
    .where('estadoReserva', '!=', 'Rechazado')).snapshotChanges();
  }

  getReservasUsuarioPendientes(id: string, idUnidad: string): Observable<any> {
    return this.firestore.collection('Reservas', ref => ref.where('idCondominio', '==', id)
    .where('idUnidad', '==', idUnidad)
    .where('estadoReserva', '==', 'Pendiente')).snapshotChanges();
  }

  eliminarReserva(idReser: string): Promise<any> {
    return this.firestore.collection('Reservas').doc(idReser).delete();
  }

  actualizarReserva(idReser: string, data: any): Promise<any> {
    return this.firestore.collection('Reservas').doc(idReser).update(data);
  }

  getReservas(idCondo: string): Observable<any> {
    return this.firestore.collection('Reservas', ref => ref.where('idCondominio', '==', idCondo).where('estadoReserva', '==', 'Pendiente').orderBy('numeroUnidad', 'desc')).snapshotChanges();
  }

}

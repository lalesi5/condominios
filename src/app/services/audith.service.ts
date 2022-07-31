import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})

export class audithService {

  constructor(
    public firestore: AngularFirestore,
  ) {
  }

  saveAudith(datosAuditoria: any) {
    const idAuditoria = this.firestore.createId();
    const data = {idAuditoria, ...datosAuditoria}
    return this.firestore.collection('Auditoria').doc(idAuditoria).set(data);
  }
}

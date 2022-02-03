import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Administrador } from '../models/administrador.interface';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AdminService {

    administradores!: Observable<Administrador[]>;
    private administradoresCollection: AngularFirestoreCollection<Administrador>;

    constructor(
        public readonly firestore: AngularFirestore,
    ) {
        this.administradoresCollection = firestore.collection<Administrador>('Administradores');
        this.getAdministradores();
     }

    onDeleteAdministradores(admId: string): Promise<void>{
        return new Promise(async (resolve, reject) => {
            try{
                const result = await this.administradoresCollection.doc(admId).delete();
                resolve(result);
            } catch(err){
                reject(err);
            }
        });
    }

    onSaveAdministradores(administrador: Administrador, admId: string): Promise<void>{
        return new Promise(async (resolve, reject) => {
            try {
                const id = admId || this.firestore.createId();
                const data = { id, ...administrador};
                const result = await this.administradoresCollection.doc(id).set(data);
            }catch (err){
                reject(err);
            }
        });
    }


    private getAdministradores(): void {
        this.administradores = this.administradoresCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => a.payload.doc.data() as Administrador))
        );
    }
    



    // getAdmin(idAdminLogged: string) {
    //     return this.firestore.collection('admins', ref => ref.where('uid', '==', idAdminLogged)).valueChanges();
    // }

    // getAdministrador() {
    //     return this.firestore.collection('Administrador')
    //         .snapshotChanges();
    // }

    // getCondominiosAdministrador(idAdministrador: string) {
    //     return this.firestore.collection('Administrador')
    //         .doc(idAdministrador)
    //         .collection('Condominios')
    //         .snapshotChanges();
    // }

    // getAreasComunalesCondominio(idAdministrador: string, idCondominio: string){
    //     return this.firestore.collection('Administrador')
    //     .doc(idAdministrador)
    //     .collection('Condominios')
    //     .doc(idCondominio)
    //     .collection('AreasComunales')
    //     .snapshotChanges();
    // }

}



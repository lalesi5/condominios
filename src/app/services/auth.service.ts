import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { first } from "rxjs";
import { AdminI } from "../models/administrador";
import { UsuarioI } from "../models/usuario";


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public afAuth: AngularFireAuth,
    private firestore: AngularFirestore) { }

  //Metodo para registrar usuario
  registerAdmin(datos: AdminI) {
    return this.afAuth.createUserWithEmailAndPassword(datos.email, datos.password);
  }

  registerUsuario(datos: UsuarioI) {
    return this.afAuth.createUserWithEmailAndPassword(datos.email, datos.password);
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      return console.error(error);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  //metodo para recuperar el usuario logeado
  getCurrentUser() {
    return this.afAuth.authState.pipe(first());
  }

  //Metodo para crear la coleccion
  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

}
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { first } from "rxjs";
import { AdminI } from "../models/administrador";
import { UsuarioI } from "../models/usuario";
import { FirestoreService } from "./firestore.service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private fstore: FirestoreService) {

  }

  //Metodo para registrar usuario administrador
  registerAdmin(datos: AdminI) {
    return this.afAuth.createUserWithEmailAndPassword(datos.email, datos.password);
  }

  //Metodo para registrar usuario administrador
  registerUsuario(datos: UsuarioI) {
    return this.afAuth.createUserWithEmailAndPassword(datos.email, datos.password);
  }


  loginAdmin(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logoutA() {
    return this.afAuth.signOut();
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

  /**
   * Metodo para inicio de sesión desde Firebase
   * @param param0 
   * @returns result
   */
  async loginByEmail({ email, password }: UsuarioI) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.error("Error en login: ", error);
      return null;
    }
  }

  /**
   * Metodo para registro de usuario en Firebase
   * @param param0 
   * @returns result
   */
  async registerByEmail({ email, password }: UsuarioI) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.error("Error en Registro: ", error);
      return null;
    }
  }

  /**
   * Metodo para cierre de sesion de usuario
   * @returns 
   */
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      return console.error(error);
    }
  }

  /**
   * Metodo para obtener el usuario logeado
   * @returns usuario logeado
   */
  getUserLogged() {
    return this.afAuth.authState;
  }

  verificarCorreo() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        user.sendEmailVerification();
      }
    })
  }

  //el que esta usando como prueba 
  logoutPrueba() {
    return this.afAuth.signOut()
  }

  //metodo para recuperar el usuario logeado
  getCurrentUser() {
    //return this.afAuth.authState;
    return this.afAuth.authState.pipe(first());
  }

  getUsuario(uid: string) {
    return this.firestore.collection('admins', ref => ref.where('uid', '==', uid)).valueChanges();
  }

  //obtener el uid del usuario
  async getUid() {
    const user = await this.afAuth.currentUser;
    if (user) {
      return user?.uid;
    } else {
      return undefined
    }

  };

}
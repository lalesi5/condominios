import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { first } from "rxjs";
import { AdminI } from "../models/administrador";
import { UsuarioI } from "../models/usuario";
import { Router } from '@angular/router';
import { deleteUser } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  //public userData$: Observable<AdminI> | undefined;

  constructor(public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {

  }

  //Metodo para registrar usuario administrador
  registerAdmin(datos: AdminI) {
    const { email, password } = datos;
    return this.afAuth.createUserWithEmailAndPassword(email, password);
    //return this.afAuth.createUserWithEmailAndPassword(datos.email, datos.password);
  }

  //Metodo para registrar usuario administrador
  registerUsuario(datos: UsuarioI) {
    return this.afAuth.createUserWithEmailAndPassword(datos.email, datos.password);
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  loginByEmail(user: AdminI) {
    const { email, password } = user;
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Completado');

      }).catch(err => console.log('Error', err))
  }

  /**
 * Metodo para inicio de sesión desde Firebase
 * @param param0 
 * @returns result
 */
  async loginByEmailAdmin({ email, password }: AdminI) {
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
  async registerByEmailAdmin({ email, password }: AdminI) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.error("Error en Registro: ", error);
      return null;
    }
  }


  /**
   * Metodo para inicio de sesión desde Firebase
   * @param param0 
   * @returns result
   */
  async loginByEmailUser({ email, password }: UsuarioI) {
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
  async registerByEmailUser({ email, password }: UsuarioI) {
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
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['']);
    }).catch((error) => {
      console.log(error);
    })
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

  //metodo para recuperar el usuario logeado
  getCurrentUser() {
    //return this.afAuth.authState;
    return this.afAuth.authState.pipe(first());
  }

  getUsuario(uid: string) {
    return this.firestore.collection('user', ref => ref.where('uid', '==', uid)).valueChanges();
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

  async deletUser(userItem: any) {
    
    deleteUser(userItem.idUsuario).then(res => {
      alert('usuario eliminado')
    })
  }

}
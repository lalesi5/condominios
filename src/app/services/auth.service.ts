import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { first } from "rxjs";
import { AdminI } from "../models/administrador";


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  //Metodo para registrar usuario
  register(datos: AdminI) {
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

  //metodo para recuperar el usuario logeado
  getCurrentUser() {
    return this.afAuth.authState.pipe(first());
  }

}
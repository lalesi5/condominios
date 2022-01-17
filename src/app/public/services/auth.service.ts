import { Injectable } from '@angular/core';
//import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { first } from 'rxjs';
import { Admin } from 'src/app/models/admin';


@Injectable()
export class AuthService {

  public User: User | undefined;

  constructor(public afAuth: AngularFireAuth) { }

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

  async register(datos: Admin) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        datos.email,
        datos.password
      );
      return result;
    } catch (error) {
      return console.log(error);
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
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}

import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'; 
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageRef = firebase.app().storage().ref();

  constructor() { }

  async subirImagen(nombre: string, imgBase64: any) {
    try {
      const respuesta = await this.storageRef.child("condominios/" + nombre).putString(imgBase64, 'data_url');
      return await respuesta.ref.getDownloadURL();

    } catch (error) {
      return null;
    }
  }
}

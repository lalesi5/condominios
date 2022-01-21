import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl } from "@angular/forms";
import { AdminI } from 'src/app/models/admin';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})

export class RegisterComponent implements OnInit {

  //prueba
  public operador: any;
  //
  datos: AdminI = {
    address: '',
    email: '',
    last_name: '',
    name: '',
    password: '',
    phone: '',
    uid: '',
  }

  registerForm = new FormGroup({
    address: new FormControl(''),
    last_name: new FormControl(''),
    name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private authSvc: AuthService,
    private firestore: FirestoreService,
    private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  /**
   * Metodo para registrar usuario
   * Guarda el usuario en una coleccion admins tomando el primer caracter del nombre junto con el apellido
   * guarda el uid del usuario autenticado como dato
   */
  async onRegister() {
    console.log('datos -> ', this.datos);
    const res = await this.authSvc.register(this.datos).catch(error => {
      console.log('error');
    })

    if (res) {
      console.log('exito al crear usuario');
      const path = 'admins';
      const id = res.user.uid;
      //const idDoc = this.datos.name.charAt(0) + this.datos.last_name;
      this.datos.uid = id;
      this.datos.password = '';
      //Guardo
      await this.firestore.createDoc(this.datos, path, id)
      this.getCondominios(id);
    }


    //apunta a la coleccion pruebaCondominio
    //const condominiosRef = this.db.collection('pruebaCondominio');
  }

  getCondominios(idDocumento: string) {
    this.firestore.getCondominios(idDocumento).subscribe(propiet => {
      console.log(propiet);
    });
  }

}

import { Component, OnInit } from '@angular/core';
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
    private firestore: FirestoreService) { }

  ngOnInit(): void {
  }

  async onRegister() {
    console.log('datos -> ', this.datos);
    const res = await this.authSvc.register(this.datos).catch(error => {
      console.log('error');
    })
    if (res) {
      console.log('exito al crear usuario');
      const path = 'Usuarios';
      const id = res.user.uid;
      this.datos.uid = id;
      this.datos.password = '';
      await this.firestore.createDoc(this.datos, path, id)

    }
  }

  /**async onRegister() {
    console.log('datos -> ', this.datos);
    //const { email, password } = this.registerForm.value;
    //this.authSvc.register(email, password);
    const res = await this.authSvc.register(this.datos).catch(error => console.log('error'));
    /**if(res){
      console.log('Exito al crear el usuario');
      const path = 'Admin';
      const id = res.user.uid;
      //this.datos.password = null;
      this.firestore.createDoc(this.datos, path, id);
    }
  }**/
}

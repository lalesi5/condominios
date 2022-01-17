import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl } from "@angular/forms";
import { Admin } from 'src/app/models/admin';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})

export class RegisterComponent implements OnInit {

  datos: Admin = {
    address: '',
    email: '',
    last_name: '',
    name: '',
    password: '',
    phone: '',
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
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  async onRegister() {
    console.log('datos -> ', this.datos);
    //const { email, password } = this.registerForm.value;
    //this.authSvc.register(email, password);
    const res = await this.authSvc.register(this.datos).catch(error => console.log('error'))
    if(res){
      console.log('Exito al crear el usuario');
      const path = 'Admin';
      const id = res.user?.uid;
    }
  }
}

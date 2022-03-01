import {Component, OnDestroy, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {NavigationExtras, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AdminI} from "src/app/models/administrador";
import {AuthService} from "src/app/services/auth.service";
import {FirestoreService} from "src/app/services/firestore.service";

@Component({
  selector: 'app-loginAdmin',
  templateUrl: './loginAdmin.component.html',
  styleUrls: ['./loginAdmin.component.css']
})

export class LoginAdminComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  private isEmail = /\S+@\S+\.\S+/;
  verifyEmail: boolean = false;
  rolUser: any;
  hide: boolean = true;
  perfilUsuario: string = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
    password: ['', Validators.required],
  });

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(private authSvc: AuthService,
              private fstore: FirestoreService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }


  onLogin() {
    const formValue = this.loginForm.value;

    this.authSvc.loginByEmailAdmin(formValue).then((res) => {
      if (res) {
        const idAdministrador = res.user.uid;
        this.getDatosUser(idAdministrador);
      } else {
        alert('Usuario autenticado');
      }
    })
  }

  getDatosUser(idAdministrador: string) {
    const path = 'Administrador';
    this.subscription.add(
      this.fstore.getDoc<AdminI>(path, idAdministrador).subscribe(res => {
        this.rolUser = res?.rol;
        this.NavigationExtras.state = res;
        if (this.rolUser === 'administrador') {
          this.router.navigate(['/selectCondominio'], this.NavigationExtras);
        } else if (this.rolUser === 'user') {
          this.router.navigate(['/user/home'], this.NavigationExtras);
        }
      })
    )
  }

  showPassword() {
    this.hide = !this.hide;
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}

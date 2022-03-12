import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { NavigationExtras, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { AdminI } from "src/app/models/administrador";
import { AuthService } from "src/app/services/auth.service";
import { FirestoreService } from "src/app/services/firestore.service";

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
    private router: Router,
    private toastr: ToastrService) {
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

        //Comprueba si el usuario ha verificado su correo al momento de registrarse
        /*this.subscription.add(
          this.authSvc.getCurrentUser().subscribe((user => {
            if (user?.emailVerified == true) {
              this.getDatosUser(idAdministrador);
            } else {
              alert('Por favor verifique el correo electronico');
              this.authSvc.logout();
              this.router.navigate(['../loginAdmin']);
            }
          }))
        )*/
        this.toastr.success('Usuario logeado Correctamente', 'Inicio de Sesión', {
          positionClass: 'toast-bottom-right', timeOut: 5000
        });
        this.getDatosUser(idAdministrador);
      } //else {
      //alert('Usuario no autenticado');
      //}
    })
  }

  getDatosUser(idAdministrador: string) {
    const path = 'Administrador';
    this.subscription.add(
      this.fstore.getDoc<AdminI>(path, idAdministrador).subscribe(res => {
        this.rolUser = res?.rol;
        this.NavigationExtras.state = res;
        if (this.rolUser === 'Administrador') {
          this.router.navigate(['/selectCondominio'], this.NavigationExtras);
        } else if (this.rolUser === 'Usuario') {
          this.router.navigate(['/user/home'], this.NavigationExtras);
        } else if (this.rolUser === 'admin-user') {

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

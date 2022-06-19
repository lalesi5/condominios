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
        // @ts-ignore
        const idAdministrador = res.user.uid;
        const path = 'Administrador';
        this.subscription.add(
          this.fstore.getDoc<AdminI>(path, idAdministrador).subscribe(res => {
            this.rolUser = res?.rol;
            if (this.rolUser === 'Administrador') {

              this.authSvc.getCurrentUser().subscribe((user => {
                if (user?.emailVerified == true) {
                  this.toastr.success('Usuario logeado Correctamente', 'Inicio de Sesión', {
                    positionClass: 'toast-bottom-right'
                  });
                  sessionStorage.setItem('idAdministrador', <string>res?.idAdministrador);
                  this.router.navigate(['/selectCondominio']);
                } else {
                  this.toastr.warning('Por favor verifique su correo electrónico', 'Correo electrónico no verificado', {
                    positionClass: 'toast-bottom-right'
                  });
                  //alert('Por favor verifique el correo electronico');
                  this.authSvc.logout();
                  this.router.navigate(['../loginAdmin']);
                }
              }))
            } else if (this.rolUser === 'Usuario') {
              // @ts-ignore
              sessionStorage.setItem('idUsuario', <string>res?.idUsuario);
              this.router.navigate(['/selectUnidad']);
            }
          })
        )


        //Comprueba si el usuario ha verificado su correo al momento de registrarse
        /*this.subscription.add(
          this.authSvc.getCurrentUser().subscribe((user => {
            if (user?.emailVerified == true) {
              this.toastr.success('Usuario logeado Correctamente', 'Inicio de Sesión', {
                positionClass: 'toast-bottom-right'
              });
              this.getDatosUser(idAdministrador);
            } else {
              this.toastr.warning('Por favor verifique su correo electrónico', 'Correo electrónico no verificado', {
                positionClass: 'toast-bottom-right'
              });
              //alert('Por favor verifique el correo electronico');
              this.authSvc.logout();
              this.router.navigate(['../loginAdmin']);
            }
          }))
        )*/
        /*this.toastr.success('Usuario logeado Correctamente', 'Inicio de Sesión', {
          positionClass: 'toast-bottom-right'
        });
        this.getDatosUser(idAdministrador);*/
      } /*else {
        this.toastr.warning('Por favor verifique su correo electrónico', 'Correo electrónico no verificado', {
          positionClass: 'toast-bottom-right'
        });
      }*/
    })
  }

  getDatosUser(idAdministrador: string) {
    const path = 'Administrador';
    this.subscription.add(
      this.fstore.getDoc<AdminI>(path, idAdministrador).subscribe(res => {
        this.rolUser = res?.rol;
        if (this.rolUser === 'Administrador') {
          sessionStorage.setItem('idAdministrador', <string>res?.idAdministrador);
          this.router.navigate(['/selectCondominio']);
        } else if (this.rolUser === 'Usuario') {
          // @ts-ignore
          sessionStorage.setItem('idUsuario', <string>res?.idUsuario);
          this.router.navigate(['/selectUnidad']);
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

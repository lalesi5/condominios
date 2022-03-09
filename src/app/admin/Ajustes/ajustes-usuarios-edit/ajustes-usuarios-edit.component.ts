import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";
import {FirestoreService} from "../../../services/firestore.service";
import {AuthService} from "../../../services/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-ajustes-usuarios-edit',
  templateUrl: './ajustes-usuarios-edit.component.html',
  styleUrls: ['./ajustes-usuarios-edit.component.css']
})
export class AjustesUsuariosEditComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  idUsuario: string = '';
  usuarios: any[] = [];
  condominio: any[] = [];

  usuariosForm: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    telefono: new FormControl('')
  });

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _administradorService: AdminService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.onListUsuarios();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.idUsuario = navigations.idUsuario;
    this.condominio = navigations;
    this.NavigationExtras.state = this.condominio;
  }

  onListUsuarios() {
    try {
      this.subscription.add(
        this._administradorService
          .getUsuarioID(this.idUsuario)
          .subscribe(data => {
            data.forEach((element: any) => {
              this.usuarios.push({
                ...element.payload.doc.data()
              })
              console.log(this.usuarios);
            })
          })
      );
    } catch (err) {
      console.log(err);
    }
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesUsuarios'], this.NavigationExtras);
  }

  onEditUser() {

    let result = confirm("Esta seguro de modificar la información")
    if (result) {

      alert('Usuario actualizado correctamente');
      this.router.navigate(['/admin/ajustes'], this.NavigationExtras);
    }
  }

}

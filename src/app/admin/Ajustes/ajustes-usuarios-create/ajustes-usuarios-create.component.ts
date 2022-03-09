import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {FirestoreService} from 'src/app/services/firestore.service';

@Component({
  selector: 'app-ajustes-usuarios-create',
  templateUrl: './ajustes-usuarios-create.component.html',
  styleUrls: ['./ajustes-usuarios-create.component.css']
})
export class AjustesUsuariosCreateComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = ''
  usuarios: any[] = [];
  condominio: any[] = [];

  usuariosForm: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    telefono: new FormControl('')
  });

  navigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private authSvc: AuthService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesUsuarios'], this.navigationExtras);
  }

  onCreateUsuarios() {
    this.crearUsuarios(this.usuariosForm.value, this.idAministrador, this.idCondominio);
    this.router.navigate(['/admin/ajustes'], this.navigationExtras);
  }

  crearUsuarios(usuario: any, idAdmin: string, idCondo: string) {
    const idAdministrador = idAdmin;
    const idCondominio = idCondo;
    const formValue = this.usuariosForm.value;
    this.authSvc.registerByEmailAdmin(formValue).then(async (res) => {
      if (res) {
        const path = 'Administrador';
        const idUsuario = res.user.uid;
        const rol = 'user';
        const data = {idAdministrador, idCondominio, idUsuario, rol, ...usuario}
        await this.firestoreService.createDoc(data, path, idUsuario);
      }
    })
  }

}

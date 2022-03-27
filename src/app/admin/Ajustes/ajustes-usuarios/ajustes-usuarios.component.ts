import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-ajustes-usuarios',
  templateUrl: './ajustes-usuarios.component.html',
  styleUrls: ['./ajustes-usuarios.component.css']
})
export class AjustesUsuariosComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idCondominio: string = ''
  usuarios: any[] = [];
  condominio: any[] = [];

  navigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _usuarioService: UsuariosService,
    private toastr: ToastrService,
    private _dialogService: DialogService,
    public firestore: AngularFirestore
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idCondominio = <string> sessionStorage.getItem('idCondominio');
    console.log(sessionStorage);
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  getUsuarios() {
    this.subscription.add(
      this._usuarioService.getUsuarios(this.idCondominio).subscribe(data => {
        this.usuarios = [];
        data.forEach((element: any) => {
          this.usuarios.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
      })
    );
  }

  eliminarUsuario(id: string) {

    this._dialogService.confirmDialog({
      title: 'Atención!',
      message: 'DEBE ELIMINAR PRIMERO LA UNIDAD A LA QUE PERTENECE EL USUARIO ¿Ha realizado esta acción?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {

        this._dialogService.confirmDialog({
          title: 'Eliminar usuario',
          message: '¿Está seguro de eliminar el usuario?',
          confirmText: 'Si',
          cancelText: 'No',
        }).subscribe(res => {
          if (res) {

            this._usuarioService.eliminarUsuario(id).then(() => {
              this.toastr.success('El usuario fue eliminado con exito', 'Registro eliminado', {
                positionClass: 'toast-bottom-right'
              });
            }).catch(error => {
              console.log(error);

            })
          }
        });

      }
    });

  }

  onGoCreate() {
    this.router.navigate(['/admin/ajustes/ajustesUsuariosCreate'], this.navigationExtras);
  }

  onGoEdit(item: any) {
    sessionStorage.setItem('idUsuario', <string> item.idUsuario);
    this.navigationExtras.state = item;
    this.router.navigate(['/admin/ajustes/ajustesUsuariosEdit'], this.navigationExtras);
  }

}

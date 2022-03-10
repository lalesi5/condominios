import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-ajustes-usuarios',
  templateUrl: './ajustes-usuarios.component.html',
  styleUrls: ['./ajustes-usuarios.component.css']
})
export class AjustesUsuariosComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = ''
  usuarios: any[] = [];
  condominio: any[] = [];

  navigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private _usuarioService: UsuariosService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.getUsuariosPrueba();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUsuariosPrueba() {
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

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  getUsuarios() {
    try {
      const path = 'Administrador'
      const idCampo = 'idCondominio'
      this.subscription.add(
        this.firestoreService
          .getUsuariosOrdenados(path, idCampo, this.idCondominio)
          .subscribe(data => {
            data.forEach((element: any) => {
              this.usuarios.push({
                ...element.payload.doc.data()
              })
            })
          })
      );
    } catch (err) {
      console.log(err);
    }
  }

  onGoCreate() {
    this.router.navigate(['/admin/ajustes/ajustesUsuariosCreate'], this.navigationExtras);
  }

  onDelete(item: any) {
    const idAreaUnidadAEliminar = item.idUsuario;
    alert('Unidad eliminada correctamente');
  }

  onGoEdit(item: any) {
    this.navigationExtras.state = item;
  }

}

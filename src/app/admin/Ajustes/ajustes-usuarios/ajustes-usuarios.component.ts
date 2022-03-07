import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FirestoreService} from 'src/app/services/firestore.service';

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
    private firestoreService: FirestoreService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUsuarios() {
    try {
      const path = 'Administrador'
      const idCampo = 'idCondominio'
      this.subscription.add(
        this.firestoreService
          .getAll(path, idCampo, this.idCondominio)
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

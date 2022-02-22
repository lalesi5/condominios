import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-ajustes-usuarios',
  templateUrl: './ajustes-usuarios.component.html',
  styleUrls: ['./ajustes-usuarios.component.css']
})
export class AjustesUsuariosComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = ''
  usuarios: any[] = [];
  condominio: any[] = [];

  navigationExtras: NavigationExtras = {
    state: {
    }
  }

  constructor(
    private router: Router,
    private firestoreService: FirestoreService
  ) {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
  }

  ngOnInit(): void {
  }

  onGoCreate() {
    this.navigationExtras.state = this.condominio;
    this.router.navigate(['/admin/ajustes/ajustesUsuariosCreate'], this.navigationExtras);
  }

  onDelete(item: any) {
    const idAreaUnidadAEliminar = item.idUsuario;
    //this._unidadesService
      //.deleteUnidades(idAreaUnidadAEliminar);
    alert('Unidad eliminada correctamente');
  }

  onGoEdit(item: any) {
    this.navigationExtras.state = item;
    //this.router.navigate(['/admin/ajustes/ajustesUnidadesEdit'], this.navigationExtras);
  }

}

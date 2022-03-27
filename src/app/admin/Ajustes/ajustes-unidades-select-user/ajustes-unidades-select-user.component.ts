import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from "rxjs";
import { UsuariosService } from "../../../services/usuarios.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-ajustes-unidades-select-user',
  templateUrl: './ajustes-unidades-select-user.component.html',
  styleUrls: ['./ajustes-unidades-select-user.component.css']
})
export class AjustesUnidadesSelectUserComponent implements OnInit {

  private subscription: Subscription = new Subscription;
  idAministrador: string = '';
  idCondominio: string = '';
  usuarios: any[] = [];
  condominio: any[] = [];

  NavigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _usuarioService: UsuariosService
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
    this.idAministrador = <string>sessionStorage.getItem('idAdministrador');
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
    console.log(sessionStorage);
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.condominio = navigations;
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

  onGoSelectUnidad(item: any) {
    sessionStorage.setItem('idUsuario', <string> item.idUsuario);
    this.NavigationExtras.state = item;
    this.router.navigate(['/admin/ajustes/ajustesUnidades'], this.NavigationExtras);
  }

}

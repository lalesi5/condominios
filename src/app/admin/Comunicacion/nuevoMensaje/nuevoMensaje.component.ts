import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup} from '@angular/forms';
import {NavigationExtras, Router} from "@angular/router";
import {MensajesService} from "../../../services/mensajes.service";

@Component({
  selector: 'app-nuevoMensaje',
  templateUrl: './nuevoMensaje.component.html',
  styleUrls: ['./nuevoMensaje.component.css']
})

export class NuevoMensajeComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = '';
  idUsuario: string = '';
  mensajes: any[] = [];
  condominio: any[] = [];

  mensajesForm = new FormGroup({
    tituloMensaje: new FormControl,
    fechaMensaje: new FormControl,
    descripcionMensaje: new FormControl
  })

  navigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _mensajesService: MensajesService
  ) {
    this.recoverData();
  }

  ngOnInit() {
    this.getMensajes();
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAministrador;
    this.idCondominio = navigations.idCondominio;
    this.idUsuario = navigations.idUsuario;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  getMensajes(){
    try{
      this._mensajesService
        .getMensajes(this.idUsuario)
        .subscribe( data => {
          data.forEach((element: any) => {
            this.mensajes.push({
              ...element.payload.doc.data()
            })
          })
        })
    } catch (err) {
      console.log(err);
    }
  }

  onBacktoList() {
    this.router.navigate(['/admin/comunicacion/individuales'], this.navigationExtras);
  }

  onCreateMensaje() {
    this._mensajesService.saveMensajes(this.mensajesForm.value,
      this.idAministrador,
      this.idCondominio);
    this.router.navigate(['/admin/comunicacion/individuales'], this.navigationExtras);
  }

}


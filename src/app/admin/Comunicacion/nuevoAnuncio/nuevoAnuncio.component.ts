import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl} from "@angular/forms";
import {NavigationExtras, Router} from '@angular/router';
import {AnunciosGeneralesService} from "src/app/services/anunciosGenerales.service";

@Component({
  selector: 'app-nuevoAnuncio',
  templateUrl: './nuevoAnuncio.component.html',
  styleUrls: ['./nuevoAnuncio.component.css']
})

export class NuevoAnuncioComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = ''
  anuncios: any[] = [];
  condominio: any[] = [];

  mensajesForm = new FormGroup({
    tituloAnuncio: new FormControl,
    fechaAnuncio: new FormControl,
    descripcionAnuncio: new FormControl
  })

  navigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _anuncios: AnunciosGeneralesService
  ) {
    this.recoverData();
  }

  ngOnInit() {
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/comunicacion'], this.navigationExtras);
  }

  onCreateAnuncios() {
    this._anuncios.saveAnunciosGenerales(this.mensajesForm.value,
      this.idAministrador,
      this.idCondominio);
    this.router.navigate(['/admin/comunicacion'], this.navigationExtras);
  }
}

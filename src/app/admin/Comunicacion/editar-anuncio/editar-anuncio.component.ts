import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AnunciosGeneralesService } from 'src/app/services/anunciosGenerales.service';

@Component({
  selector: 'app-editar-anuncio',
  templateUrl: './editar-anuncio.component.html',
  styleUrls: ['./editar-anuncio.component.css']
})
export class EditarAnuncioComponent implements OnInit {

  idAministrador: string = '';
  idCondominio: string = '';
  idAnuncioGeneral: string = '';
  anuncios: any[] = [];
  condominio: any[] = [];

  anunciosForm = new FormGroup({
    tituloAnuncio: new FormControl,
    fechaAnuncio: new FormControl,
    descripcionAnuncio: new FormControl  
  })

  navigationExtras: NavigationExtras = {
    state: {

    }
  }

  constructor(
      private router: Router,
      private _anuncios: AnunciosGeneralesService
  ){
      const navigations: any = this.router.getCurrentNavigation()?.extras.state;
      this.idAministrador = navigations.idAdministrador;
      this.idCondominio = navigations.idCondominio;
      this.idAnuncioGeneral = navigations.idAnuncioGeneral;
      this.condominio = navigations;
  }

  ngOnInit(): void {
  }

  onBacktoList(): void {
    this.navigationExtras.state = this.condominio;
    this.router.navigate(['/admin/comunicacion'], this.navigationExtras);
  }

  onEditAnuncios(){
    this.navigationExtras.state = this.condominio;
    this._anuncios.saveAnunciosGenerales(this.anunciosForm.value, this.idAministrador, this.idCondominio, this.idAnuncioGeneral);
  }

}

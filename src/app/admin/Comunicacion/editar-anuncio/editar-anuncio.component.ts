import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';
import {AnunciosGeneralesService} from 'src/app/services/anunciosGenerales.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-editar-anuncio',
  templateUrl: './editar-anuncio.component.html',
  styleUrls: ['./editar-anuncio.component.css']
})
export class EditarAnuncioComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
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
    state: {}
  }

  constructor(
    private router: Router,
    private _anuncios: AnunciosGeneralesService
  ) {
    this.recoverData();
  }

  ngOnInit(): void {
    this.getAnuncioGeneral();
  }

  ngOnDestroy(): void {
  }

  recoverData() {
    const navigations: any = this.router.getCurrentNavigation()?.extras.state;
    this.idAministrador = navigations.idAdministrador;
    this.idCondominio = navigations.idCondominio;
    this.idAnuncioGeneral = navigations.idAnuncioGeneral;
    this.condominio = navigations;
    this.navigationExtras.state = this.condominio;
  }

  getAnuncioGeneral() {
    try {
      this.subscription.add(
        this._anuncios
          .getAnuncioGeneral(this.idAnuncioGeneral)
          .subscribe(data => {
            data.forEach((element: any) => {
              this.anuncios.push({
                ...element.payload.doc.data()
              })
            })
          })
      );
    } catch (err) {
      console.log(err);
    }
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/comunicacion'], this.navigationExtras);
  }

  onEditAnuncios() {
    let result = confirm("Esta seguro de modificar la información")
    if (result) {
      this._anuncios.updateAnunciosGenerales(this.anunciosForm.value,
        this.idAministrador,
        this.idCondominio,
        this.idAnuncioGeneral);
      this.router.navigate(['/admin/comunicacion'], this.navigationExtras)
    }
  }
}

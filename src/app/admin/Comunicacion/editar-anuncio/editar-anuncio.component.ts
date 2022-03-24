import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AnunciosGeneralesService } from 'src/app/services/anunciosGenerales.service';
import { Subscription } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';

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
  loading = false;
  id: string | null;

  anunciosForm: FormGroup;

  navigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _anuncios: AnunciosGeneralesService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {

    this.anunciosForm = this.fb.group({
      tituloAnuncio: ['', Validators.required],
      descripcionAnuncio: [''],
    })

    this.id = aRoute.snapshot.paramMap.get('id');

    this.recoverData();
  }

  ngOnInit(): void {
    this.getAnuncioGeneral();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    if (this.id !== null) {
      this.loading = true;
      this.subscription.add(
        this._anuncios.getAnuncioGeneral(this.id).subscribe(data => {
          this.loading = false;
          this.anunciosForm.setValue({
            tituloAnuncio: data.payload.data()['tituloAnuncio'],
            descripcionAnuncio: data.payload.data()['descripcionAnuncio'],
          })
        })
      )
    }
  }

  onEditAnuncios() {
    const titulo = String(this.anunciosForm.value.tituloAnuncio).charAt(0).toLocaleUpperCase() + String(this.anunciosForm.value.tituloAnuncio).slice(1);
    var date = new Date();

    const anuncio: any = {
      descripcionAnuncio: this.anunciosForm.value.descripcionAnuncio,
      fechaAnuncio: date.toLocaleString(),
      tituloAnuncio: titulo
    }

    this.subscription.add(
      this._dialogService.confirmDialog({
        title: 'Agregar área',
        message: '¿Esta seguro de modificar la información?',
        confirmText: 'Si',
        cancelText: 'No',
      }).subscribe(res => {
        if (res) {
          this.loading = true;
          this._anuncios.updateAnunciosGenerales(this.idAnuncioGeneral, anuncio).then(() => {
            this.loading = false;
            this.toastr.success('La información fue modificada con exito', 'Anuncio modificado', {
              positionClass: 'toast-bottom-right'
            });
          })
          this.loading = false;
          this.navigationExtras.state = this.condominio;
          this.router.navigate(['/admin/comunicacion'], this.navigationExtras);
        }
      })
    )

  }

  onBacktoList(): void {
    this.router.navigate(['/admin/comunicacion'], this.navigationExtras);
  }
}

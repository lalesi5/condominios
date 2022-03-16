import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { AnunciosGeneralesService } from "src/app/services/anunciosGenerales.service";
import { DialogService } from "src/app/services/dialog.service";

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
  loading = false;

  mensajesForm: FormGroup;

  navigationExtras: NavigationExtras = {
    state: {}
  }

  constructor(
    private router: Router,
    private _anuncios: AnunciosGeneralesService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService
  ) {

    this.mensajesForm = this.fb.group({
      tituloAnuncio: ['', Validators.required],
      fechaAnuncio: ['', Validators.required],
      descripcionAnuncio: [''],
    })

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

  onCreateAnuncios() {
    const titulo = String(this.mensajesForm.value.tituloAnuncio).charAt(0).toLocaleUpperCase() + String(this.mensajesForm.value.tituloAnuncio).slice(1);

    this._dialogService.confirmDialog({
      title: 'Crear anuncio general',
      message: '¿Está seguro de crear el anuncio?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        const anuncio: any = {
          descripcionAnuncio: this.mensajesForm.value.descripcionAnuncio,
          fechaAnuncio: this.mensajesForm.value.fechaAnuncio,
          idAdministrador: this.idAministrador,
          idCondominio: this.idCondominio,
          tituloAnuncio: titulo
        }
        //Crea el documento
        this.loading = true;
        this._anuncios.saveAnunciosGenerales(anuncio).then(() => {

          this.toastr.success('El anuncio general fue creado con exito', 'Anuncio Creado', {
            positionClass: 'toast-bottom-right'
          });
          this.loading = false;
          this.navigationExtras.state = this.condominio;
          this.router.navigate(['/admin/comunicacion'], this.navigationExtras);

        }).catch(error => {
          console.log(error);
          this.loading = false;
        });
      }
    });
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/comunicacion'], this.navigationExtras);
  }
}

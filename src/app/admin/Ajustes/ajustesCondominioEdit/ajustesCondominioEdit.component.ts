import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CondominioService } from '../../../services/condominios.service';
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "src/app/services/dialog.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: 'app-ajustesCondominioEdit',
  templateUrl: './ajustesCondominioEdit.component.html',
  styleUrls: ['./ajustesCondominioEdit.component.css']
})

export class AjustesCondominioEditComponent implements OnInit {

  /*Variables*/
  private subscription: Subscription = new Subscription;
  idCondominio: string = '';
  nombreCondominio: string = '';
  ciudadCondominio: string = '';
  descripcionCondominio: string = '';
  loading = false;

  public image: any;
  public currentImage: any;
  imagen: any[] = [];
  public imgFile: any;

  /*Formularios*/
  condominioForm: FormGroup;

  constructor(
    private router: Router,
    private _condominiosService: CondominioService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private _storageService: StorageService
  ) {

    this.condominioForm = this.fb.group({
      nombreCondominio: ['', Validators.required],
      ciudadCondominio: ['', Validators.required],
      descripcionCondominio: [''],
      imgCondominio: ['']
    });

    this.recoverData();
  }

  ngOnInit(): void {
    this.onListCondminios();
  }

  recoverData() {
    this.idCondominio = <string>sessionStorage.getItem('idCondominio');
  }

  onListCondminios() {
    if (this.idCondominio !== null) {
      this.loading = true;
      this.subscription.add(
        this._condominiosService.getCondominio(this.idCondominio).subscribe(data => {
          this.loading = false;
          this.condominioForm.setValue({
            nombreCondominio: data.payload.data()['nombreCondominio'],
            ciudadCondominio: data.payload.data()['ciudadCondominio'],
            descripcionCondominio: data.payload.data()['descripcionCondominio'],
            imgCondominio: data.payload.data()['imgCondominio']
          })
          this.currentImage = this.condominioForm.value.imgCondominio;
        })
      )
    }
  }

  handleImage(image: any): void {
    this.image = image;
  }

  cargarImagen(event: any) {
    console.log(event.target.files[0]);
    this.imagen = [];

    this.imgFile = event;
    console.log('p1', this.imgFile);

    let archivo = event.target.files;
    let reader = new FileReader();

    reader.readAsDataURL(archivo[0]);
    reader.onloadend = () => {
      this.imagen.push(reader.result);
      this.currentImage = this.imagen[0];
    }
  }

  onSaveCondominio() {

    /*const condominio: any = {
      nombreCondominio: nombre,
      ciudadCondominio: ciudad,
      descripcionCondominio: this.condominioForm.value.descripcionCondominio,
    }
*/
    this._dialogService.confirmDialog({
      title: 'Modificar información de condominio',
      message: '¿Está seguro de modificar la información?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        const nombreCondominio = String(this.condominioForm.value.nombreCondominio).charAt(0).toLocaleUpperCase() + String(this.condominioForm.value.nombreCondominio).slice(1);
        const ciudadCondominio = String(this.condominioForm.value.ciudadCondominio).charAt(0).toLocaleUpperCase() + String(this.condominioForm.value.ciudadCondominio).slice(1);
        const descripcionCondominio = this.condominioForm.value.descripcionCondominio;
        const idCondo = this.idCondominio;

        this.imagen = [];
        const nombreImg = String(this.condominioForm.value.nombreCondominio).charAt(0).toLocaleLowerCase() + String(this.condominioForm.value.nombreCondominio).slice(1);

        let archivo = this.imgFile.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(archivo[0]);
        reader.onloadend = () => {
          this.imagen.push(reader.result);
          this._storageService.subirImagen(nombreImg + "_" + Date.now(), reader.result).then(urlImagen => {
            const imgCondominio = urlImagen;
            const data = { nombreCondominio, ciudadCondominio, descripcionCondominio, imgCondominio }
            this._condominiosService.updateCondominios(idCondo!, data);
          });
        }

        this.toastr.success('La información del condominio fue modificada con exito', 'Condominio modificado', {
          positionClass: 'toast-bottom-right'
        });
        this.loading = false;
        this.router.navigate(['/admin/ajustes/ajustesCondominio']);
      }
    })
  }

  onBacktoList(): void {
    this.router.navigate(['/admin/ajustes/ajustesCondominio']);
  }
}

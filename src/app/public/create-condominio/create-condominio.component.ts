import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CondominioService } from '../../services/condominios.service';
import { finalize, Observable, Subscription } from "rxjs";
import { DialogService } from 'src/app/services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-create-condominio',
  templateUrl: './create-condominio.component.html',
  styleUrls: ['./create-condominio.component.css']
})
export class CreateCondominioComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  /*Variables*/
  idAministrador: string = '';

  public pruebaImg = '';
  public imgFile: any;
  nombreImg: string = '';
  imagen: any[] = [];
  public currentImage: any;

  uploadPercent!: Observable<number>;
  urlImage!: Observable<string>;
  @ViewChild('imageUser') inputImageUser!: ElementRef

  /*Formularios*/

  condominioForm = this.fb.group({
    nombreCondominio: ['', Validators.required],
    ciudadCondominio: ['', Validators.required],
    descripcionCondominio: [''],
  })

  constructor(
    private router: Router,
    private _condominioService: CondominioService,
    private fb: FormBuilder,
    private _dialogService: DialogService,
    private toastr: ToastrService,
    private storage: AngularFireStorage,
    private _storageService: StorageService
  ) {

    this.recoverData();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  recoverData() {
    this.idAministrador = <string>sessionStorage.getItem('idAdministrador');
  }

  onGoBackToList() {
    this.router.navigate(['/selectCondominio']);
  }

  cargarImagen(event: any) {
    //const id = Math.random().toString(36).substring(2);
    //const file = event.target.files[0];
    //this.pruebaImg = event.target.files[0];
    //const filePath = `uploads/profile_${id}`;
    //const ref = this.storage.ref(filePath);
    //const task = this.storage.upload(filePath, file);
    //const task = this.storage.upload(filePath, this.pruebaImg);
    //console.log('task', task);

    //this.uploadPercent = task.percentageChanges();
    //task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
    //console.log(event.target.files[0].name);
    this.imagen = [];
    this.imgFile = event;
    //console.log('p1', this.imgFile);

    let archivo = event.target.files;
    let reader = new FileReader();

    reader.readAsDataURL(archivo[0]);
    reader.onloadend = () => {
      this.imagen.push(reader.result);
      this.currentImage = this.imagen[0];
    }
  }

  onCreate() {

    this._dialogService.confirmDialog({
      title: 'Agregar Condominio',
      message: '¿Está seguro de agregar el condominio?',
      confirmText: 'Si',
      cancelText: 'No',
    }).subscribe(res => {
      if (res) {
        const nombreCondominio = String(this.condominioForm.value.nombreCondominio).charAt(0).toLocaleUpperCase() + String(this.condominioForm.value.nombreCondominio).slice(1);
        const ciudadCondominio = String(this.condominioForm.value.ciudadCondominio).charAt(0).toLocaleUpperCase() + String(this.condominioForm.value.ciudadCondominio).slice(1);
        const descripcionCondominio = this.condominioForm.value.descripcionCondominio;

        this.imagen = [];
        const nombreImg = String(this.condominioForm.value.nombreCondominio).charAt(0).toLocaleLowerCase() + String(this.condominioForm.value.nombreCondominio).slice(1);

        if (this.imgFile != null) {
          let archivo = this.imgFile.target.files;
          let reader = new FileReader();
          reader.readAsDataURL(archivo[0]);
          reader.onloadend = () => {
            this.imagen.push(reader.result);
            this._storageService.subirImagen(nombreImg + "_" + Date.now(), reader.result).then(urlImagen => {
              const imgCondominio = urlImagen;
              const data = { nombreCondominio, ciudadCondominio, descripcionCondominio, imgCondominio }
              this._condominioService.saveCondominios(data, this.idAministrador);
            });
          }
        } else {
          const imgCondominio = "https://firebasestorage.googleapis.com/v0/b/condominiosepn-68a1d.appspot.com/o/condominios%2Fzimba_1651702407689?alt=media&token=3cb6d8b9-05ce-4b72-b0a9-bef9a8678a6e";
          const data = { nombreCondominio, ciudadCondominio, descripcionCondominio, imgCondominio }
          this._condominioService.saveCondominios(data, this.idAministrador);
        }

        //const data = { nombreCondominio, ciudadCondominio, descripcionCondominio }

        this.toastr.success('El condominio se ha creado exitosamente', 'Registro exitoso', {
          positionClass: 'toast-bottom-right', timeOut: 10000
        });
        this.router.navigate(['/selectCondominio']);
      }
    });
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.condominioForm.controls;
  }

  get nombreCondominio() {
    return this.condominioForm.get('nombreCondominio');
  }

  get ciudadCondominio() {
    return this.condominioForm.get('ciudadCondominio');
  }
}

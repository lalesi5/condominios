import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "src/app/services/dialog.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    private isEmail = /\S+@\S+\.\S+/;

    emailPrueba = require('../../../../config/emailer');

    contactForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        message: new FormControl(''),
        phone: new FormControl('')
    });

    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private _dialogService: DialogService
    ) { }

    ngOnInit() {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
            message: ['', Validators.required],
            phone: ['', [Validators.pattern(/^.{9,13}$/)]]
        });
    }

    public sendEmail(e: Event) {

        this._dialogService.confirmDialog({
            title: 'Enviar Mensaje',
            message: '¿Está seguro dde enviar la información?',
            confirmText: 'Si',
            cancelText: 'No',
          }).subscribe(res => {
            if (res) {
                e.preventDefault();

                emailjs.sendForm('default_service', 'template_i0y7v67', e.target as HTMLFormElement, '0Cxe1Mx3gDATMrfDQ')
                    .then((result: EmailJSResponseStatus) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
        
                this.toastr.success('Mensaje enviado correctamente', 'Mensaje Enviado', {
                    positionClass: 'toast-bottom-right', timeOut: 10000
                });
                this.ngOnInit();
            }
          });
    }

    /*onSubmit() {
        const email = this.contactForm.value.email;
        const name = this.contactForm.value.name;

        const contact: any = ({
            name: this.contactForm.value.name,
            email: this.contactForm.value.email,
            message: this.contactForm.value.message,
        })

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.post('https://formspree.io/f/xbjwbbll',
            { Nombre: this.contactForm.value.name, Email: this.contactForm.value.email, replyto: email.email, Mensaje: this.contactForm.value.message },
            { 'headers': headers }).subscribe(
                response => {
                    console.log(response);
                }
            );
        this.ngOnInit()
        //this.emailPrueba.sendEmail(contact);

    }*/


    get form(): { [key: string]: AbstractControl; } {
        return this.contactForm.controls;
    }

    get email() {
        return this.contactForm.get('email');
    }

    get phone() {
        return this.contactForm.get('phone');
    }
}
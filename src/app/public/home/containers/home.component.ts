import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EmailService } from "src/app/services/email.service";

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
        message: new FormControl('')
    });

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router
        //private _emailService: EmailService
    ) { }

    ngOnInit() {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
            message: ['', Validators.required]
        });
    }

    onSubmit() {

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
        this.ngOnInit();
        //this.emailPrueba.sendEmail(contact);

    }

    /*onSubmit(): void {
        const contact: any = ({
            name: this.contactForm.value.name,
            email: this.contactForm.value.email,
            message: this.contactForm.value.message,
        })
        //Service to handle the http POST request in the background
        this.emailService_.sendEmail(contact).subscribe(res => {
            if (res.ok) {
                this.contactForm.reset();
            } else {
                console.error(res);
            }
        });
    
    }*/

    get form(): { [key: string]: AbstractControl; } {
        return this.contactForm.controls;
    }

    get email() {
        return this.contactForm.get('email');
    }
}
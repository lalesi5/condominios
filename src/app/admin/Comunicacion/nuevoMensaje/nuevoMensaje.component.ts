import { Component, OnInit } from "@angular/core";
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-nuevoMensaje',
    templateUrl: './nuevoMensaje.component.html',
    styleUrls: ['./nuevoMensaje.component.css']
})

export class NuevoMensajeComponent implements OnInit{
    constructor(){}
    
    ngOnInit(){}
}

export class SelectMultipleExample {
    toppings = new FormControl();
    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  }
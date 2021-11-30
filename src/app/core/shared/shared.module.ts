import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule } from '@angular/router';

import {MatIconModule} from '@angular/material/icon'; 

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({

  imports: [
    HttpClientModule,
    RouterModule,
    MatIconModule
  ],
  declarations: [
    NotFoundComponent,
    HeaderComponent
  ],
  exports: [
    HttpClientModule,
    RouterModule,
    NotFoundComponent,
    HeaderComponent,
    MatIconModule
  ],
  providers:[]
})
export class SharedModule {

  constructor(){
    
  }

 }

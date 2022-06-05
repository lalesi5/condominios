import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {HeaderInsideComponent} from "./components/headerInside/headerInside.component";
import {CommonModule} from "@angular/common";

@NgModule({

  imports: [
    HttpClientModule,
    RouterModule,
    MatCommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule
  ],
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    HeaderInsideComponent,
    FooterComponent,
    MatConfirmDialogComponent
  ],
  exports: [
    HttpClientModule,
    RouterModule,
    NotFoundComponent,
    HeaderComponent,
    MatIconModule,
    FooterComponent,
    HeaderInsideComponent
  ],
  providers: []
})
export class SharedModule {

  constructor() {

  }

}

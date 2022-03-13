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

@NgModule({

  imports: [
    HttpClientModule,
    RouterModule,
    MatCommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    MatConfirmDialogComponent
  ],
  exports: [
    HttpClientModule,
    RouterModule,
    NotFoundComponent,
    HeaderComponent,
    MatIconModule,
    FooterComponent
  ],
  providers: []
})
export class SharedModule {

  constructor() {

  }

}

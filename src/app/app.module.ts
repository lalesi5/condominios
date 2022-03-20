import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/compat/firestore';

import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
//syncfusion library
import { ExcelExportService, FilterService, GridAllModule, GridModule, GroupService, PageService, PdfExportService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';

@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatIconModule,
    MatCommonModule,
    MatButtonModule,
    GridModule,
    GridAllModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AngularFirestore,
    PageService,
    SortService,
    FilterService,
    GroupService,
    PdfExportService, 
    ToolbarService,
    ExcelExportService
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
}

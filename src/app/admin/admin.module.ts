import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';

import { SharedModule } from '../core/shared/shared.module';


@NgModule({

    imports: [
        HttpClientModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
    ],
    exports: [
        HttpClientModule,
        RouterModule,
    ],
    providers: []
})
export class AdminModule {

    constructor() {

    }

}
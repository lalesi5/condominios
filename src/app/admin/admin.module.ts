import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';

import { SharedModule } from '../core/shared/shared.module';
import { NavigationComponent } from './components/navigation/navigation.component';


@NgModule({

    imports: [
        HttpClientModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
        NavigationComponent
    ],
    exports: [
        HttpClientModule,
        RouterModule,
        NavigationComponent
    ],
    providers: []
})
export class AdminModule {

    constructor() {

    }

}
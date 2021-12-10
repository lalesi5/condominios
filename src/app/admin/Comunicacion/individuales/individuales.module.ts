import { NgModule } from "@angular/core";

import { IndividualesRoutingModule } from "./individuales-routing.module";
import { IndividualesNuevoComponent } from "./nuevo/individualesNuevo.component";


@NgModule({
    imports: [
        IndividualesRoutingModule
    ],
    declarations: [
        IndividualesNuevoComponent
    ],
    exports: []
})

export class IndividualesModule {
    constructor() {

    }
}

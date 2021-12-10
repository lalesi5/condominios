import { NgModule } from "@angular/core";
import { GeneralesRoutingModule } from "./generales.routing.module";
import { GeneralesNuevoComponent } from "./nuevo/generalesNuevo.component";


@NgModule({
    imports: [
        GeneralesRoutingModule
    ],
    declarations: [
        GeneralesNuevoComponent
    ],
    exports: []
})

export class GeneralesModule {
    constructor() {

    }
}

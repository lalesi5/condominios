import { NgModule} from "@angular/core";
import { ComunicacionRoutingModule } from "./comunicacion-routing.module";

import { GeneralesComponent } from "./generales/generales.component";
import { IndividualesComponent } from "./individuales/individuales.component";

@NgModule({
    imports: [
        ComunicacionRoutingModule
    ],
    declarations:[
        GeneralesComponent,
        IndividualesComponent
    ],
    exports: []
})

export class ComunicacionModule {
    constructor(){

    }
}

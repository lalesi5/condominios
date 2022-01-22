import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CondominiosComponent } from './condominios.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListarCondominiosComponent } from './ListarCondominios/listarCondominios.component';



const routesCondominios: Routes = [
    {
        path: '', component: CondominiosComponent, children:
        [
            {path: '', redirectTo: 'listar', pathMatch: 'full'},
            {path: 'listar', component: ListarCondominiosComponent},
            
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routesCondominios), CommonModule, ReactiveFormsModule],
    exports: [RouterModule]

})

export class CondominiosRoutingModule {}
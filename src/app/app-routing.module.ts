import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './core/shared/components/not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { CheckLoginGuard } from './core/shared/guards/check-login.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate:[CheckLoginGuard]},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate:[CheckLoginGuard]},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

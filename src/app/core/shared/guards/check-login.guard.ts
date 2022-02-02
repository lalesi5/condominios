import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authSvc: AuthService,
    private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return this.authSvc.afAuth.authState.pipe(
    //map(authState => !! authState))
    //const onlyUser = () => map(user => user ? ['profiles', user.uid, 'edit'] : ['login']);

    /*this.authSvc.afAuth.authState.subscribe(user => {
      const uidUser = user?.uid;
      return () => map((user: any) => !!user && user?.uid === uidUser);

    })*/
    return this.authSvc.afAuth.authState.pipe(
      take(1)).pipe(
      map(authState => !! authState)).pipe(tap(logado => {
        if (!logado) {
          this.router.navigate(['/home']);
        }
      }));

    //return true;
  }

}

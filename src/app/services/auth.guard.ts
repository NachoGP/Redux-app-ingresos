import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  
  constructor( private authService: AuthService,
               private router: Router ) {}
//ambos se parece mucho, salvo que CanLoad tiene que disparar una nueva subcripción cuando se carga, por lo cual requiere el take(1) de rxjs, para cancelar la subcripción una vez resuelta. Cada vez que entro en el modulo tengo que verificar disparando una nueva subcripción.
  canLoad(): Observable<boolean>{
    return this.authService.isAuth()
        .pipe(
          tap( estado => {
            if ( !estado ) { this.router.navigate(['/login'])}
          }),
          //de esta manera se cancela la subcripción.
          take(1)
        );
  }
  canActivate(): Observable<boolean>{
    return this.authService.isAuth()
        .pipe(
          tap( estado => {
            if ( !estado ) { this.router.navigate(['/login'])}
          })
        );
  }

}

import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path:'',
        // canActivate: [AuthGuard], siempre carga el modulo, para hacer algo (en este caso, saber si está autorizado o no, utilizaremos CanLoad.)
        canLoad: [AuthGuard],
        loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module')
                            .then( m => m. IngresoEgresoModule)
    },

    { path: '**', redirectTo: '' }
];


@NgModule({

    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]

})
export class AppRoutingModule {}

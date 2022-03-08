import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//ngRx
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['nacho@a.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    });
    //creo otra subcripción al store:
    this.uiSubscription = this.store.select('ui')
                        .subscribe(ui =>
                          this.cargando = ui.isLoading)

  }

  ngOnDestroy(): void {
    //Haremos limpieza para evitar subcriciones duplicadas
    this.uiSubscription.unsubscribe();
  }

  loginUsuario() {
    if (this.loginForm.invalid) { return; }

    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Espere, por favor!',

    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });

    const { email, password } = this.loginForm.value;

    this.authService.loginUsuario(email, password)
      .then(login => {
        console.log("Data del login", login);
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/'])
      })
      .catch(err => {
        console.log("Data del error", err);
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Error:',
          text: err.message,
        })

      })

  }

}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubs!: Subscription;
  
  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }


  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      console.log('fuser', fuser);
      if (fuser) {
        //existe
        this.userSubs = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe((firestoreUser: any) => {
            console.log('firestoreUser', firestoreUser);
            const user = Usuario.fromFirebase(firestoreUser);
            this.store.dispatch(authActions.setUser({ user }) );

          })

      } else {
        console.log("Llamar unset del user.");
        if(this.userSubs){
           this.userSubs.unsubscribe()
        }
        //no existe
        console.log("llamar a unset del user");
        this.store.dispatch(authActions.unSetUser() );


      }


    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    // console.log("Data del servicio Auth:", nombre, email, password );
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(fbUser => {
        const newUser = new Usuario(fbUser.user!.uid, nombre, email)
        return this.firestore.doc(`${fbUser.user!.uid}/usuario`).set({ ...newUser })

      });
  }
  loginUsuario(email: string, password: string) {
    console.log(email, password);
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.auth.signOut();
  }
  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }

}

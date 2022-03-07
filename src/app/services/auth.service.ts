import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore
    ) { }


  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      console.log(fuser);
      // console.log(fuser?.uid);
      // console.log(fuser?.email);

    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    // console.log("Data del servicio Auth:", nombre, email, password );
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then (fbUser => {
      const newUser = new Usuario (fbUser.user!.uid, nombre, email)
      return this.firestore.doc(`${fbUser.user!.uid}/usuario`).set({...newUser})
      
    });
  }
  loginUsuario(email: string, password: string) {
    console.log(email, password);
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.auth.signOut();
  }
  isAuth(){
    return this.auth.authState.pipe(
      map (fbUser => fbUser !=null)
    );
  }

}

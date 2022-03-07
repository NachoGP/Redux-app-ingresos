import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }


  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      console.log(fuser);
      // console.log(fuser?.uid);
      // console.log(fuser?.email);

    })
  }





  crearUsuario(nombre: string, email: string, password: string) {
    // console.log("Data del servicio Auth:", nombre, email, password );
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  loginUsuario(email: string, password: string) {
    console.log(email, password);
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.auth.signOut();
  }

}

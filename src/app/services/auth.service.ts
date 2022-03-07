import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  crearUsuario(nombre: string, email: string, password: string){
    // console.log("Data del servicio Auth:", nombre, email, password );
    this.auth.createUserWithEmailAndPassword(email, password);
  }
}

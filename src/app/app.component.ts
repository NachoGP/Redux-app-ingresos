import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ingresoEgreso';
  constructor(firestore: AngularFirestore, private authService: AuthService) {

    this.authService.initAuthListener()

  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registroForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

  }

  crearUsuario() {
    if (this.registroForm.invalid) { return; }

    const { nombre, correo, password } = this.registroForm.value;
    this.authService.crearUsuario(nombre, correo, password);
    console.log({ nombre, correo, password });

  }

}

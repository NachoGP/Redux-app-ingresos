import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html'
})
export class IngresoEgresoComponent implements OnInit {

  ingresoForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    let NonZero = '^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$';
    this.ingresoForm = this.fb.group({
      description: ['', Validators.required],
      cantidad: ['', Validators.required],

    })
  }

guardar(){
  if( this.ingresoForm.invalid) { return; }
  console.log(this.ingresoForm.value);
}


}

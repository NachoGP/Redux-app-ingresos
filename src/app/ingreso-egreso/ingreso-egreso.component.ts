import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoDevolucionService } from '../services/ingreso-devolucion.service';
import * as  ui from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html'
})
export class IngresoEgresoComponent implements OnInit {

  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ingresoDevolucionService: IngresoDevolucionService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.store.select('ui').subscribe(({ isLoading }) => this.cargando = isLoading)

    this.ingresoForm = this.fb.group({
      description: ['', Validators.required],
      cantidad: ['', Validators.required],

    })
  }

  guardar() {

    
    setTimeout(() => {
      
      this.store.dispatch(ui.stopLoading())
      //cancelar loading
      
    }, 2500);
    
    this.store.dispatch(ui.isLoading())
    return;

    if (this.ingresoForm.invalid) { return; }
    // console.log(this.ingresoForm.value);
    // console.log("tipo:", this.tipo);

    const { description, cantidad } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(description, cantidad, this.tipo);
    this.ingresoDevolucionService.crearIngresoDevolucion(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        Swal.fire('Registro creado', description, 'success');
      })
      .catch(err => Swal.fire('Error:', err.message, 'error'));

  }


}

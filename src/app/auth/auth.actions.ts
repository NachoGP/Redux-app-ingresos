import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';

export const setUser = createAction(
	'[Auth] setUser',
	//debe recibir el usuario, para ello las props:
	props<{ user: Usuario }>()
	);

	//otra acción será para quitar le usuario: Ir sin argumento.simplemente quitaremos el usuario
export const unSetUser = createAction('[Auth] unsetUser');
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  isEditMode = signal(false);
  title = signal('Nuevo Usuario');
  btnText = signal('Guardar');

  userForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    image: new FormControl('', [Validators.required, Validators.pattern('https?://.+')]),
  });

  get f() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    alert('Formulario enviado (integración pendiente)');
  }
}

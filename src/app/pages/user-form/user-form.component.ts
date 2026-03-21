import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usersService = inject(UsersService);

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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.title.set('Actualizar Usuario');
      this.btnText.set('Actualizar');
    }
  }

  get f() {
    return this.userForm.controls;
  }

  async onSubmit(): Promise<void> {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const userData = this.userForm.value as any;
    const resp = await this.usersService.create(userData);

    if (resp.success) {
      await Swal.fire('¡Éxito!', resp.success, 'success');
      this.router.navigate(['/home']);
    } else {
      Swal.fire('Error', resp.error, 'error');
    }
  }
}

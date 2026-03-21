import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
})
export class UserViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usersService = inject(UsersService);

  user = signal<IUser | null>(null);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.user.set(await this.usersService.getById(id));
  }

  async deleteUser() {
    const result = await Swal.fire({
      title: `¿Eliminar a ${this.user()?.first_name} ${this.user()?.last_name}?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
    });

    if (!result.isConfirmed) return;

    const resp = await this.usersService.delete(this.user()!._id!);
    if (resp.success) {
      await Swal.fire('Eliminado', resp.success, 'success');
      this.router.navigate(['/home']);
    } else {
      Swal.fire('Error', resp.error ?? 'No se pudo eliminar el usuario.', 'error');
    }
  }
}

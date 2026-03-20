import { Component, OnInit, inject, signal } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private usersService = inject(UsersService);

  users = signal<IUser[]>([]);
  loading = signal(true);

  async ngOnInit() {
    this.users.set(await this.usersService.getAll());
    this.loading.set(false);
  }

  async deleteUser(user: IUser): Promise<void> {
    const result = await Swal.fire({
      title: `¿Eliminar a ${user.first_name} ${user.last_name}?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
    });

    if (!result.isConfirmed) return;

    const resp = await this.usersService.delete(user._id!);
    if (resp.success) {
      Swal.fire('Eliminado', resp.success, 'success');
      this.users.update((list) => list.filter((u) => u._id !== user._id));
    } else {
      Swal.fire('Error', resp.error ?? 'No se pudo eliminar el usuario.', 'error');
    }
  }
}

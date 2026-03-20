import { Component, signal } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  users = signal<IUser[]>([
    {
      _id: '1',
      first_name: 'Ana',
      last_name: 'García',
      email: 'ana@email.com',
      username: 'ana.garcia',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      _id: '2',
      first_name: 'Carlos',
      last_name: 'López',
      email: 'carlos@email.com',
      username: 'carlos.lopez',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      _id: '3',
      first_name: 'María',
      last_name: 'Martínez',
      email: 'maria@email.com',
      username: 'maria.martinez',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      _id: '4',
      first_name: 'Pedro',
      last_name: 'Sánchez',
      email: 'pedro@email.com',
      username: 'pedro.sanchez',
      image: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]);

  deleteUser(user: IUser): void {
    if (confirm(`¿Eliminar a ${user.first_name} ${user.last_name}?`)) {
      this.users.update((list) => list.filter((u) => u._id !== user._id));
    }
  }
}

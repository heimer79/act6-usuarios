import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
})
export class UserViewComponent {
  user = signal<IUser | null>({
    _id: '1',
    first_name: 'Ana',
    last_name: 'García',
    email: 'ana@email.com',
    username: 'ana.garcia',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  });
}

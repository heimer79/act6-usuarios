import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  user = input.required<IUser>();
  onDelete = output<IUser>();
}

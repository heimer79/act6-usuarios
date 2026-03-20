import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { IResponse } from '../interfaces/response.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {

  private baseUrl = 'https://peticiones.online/api/users';
  private httpClient = inject(HttpClient);

  // GET /users — listado completo
  getAll(): Promise<IUser[]> {
    return lastValueFrom(
      this.httpClient.get<IUser[]>(this.baseUrl)
    );
  }

  // GET /users/:id — detalle de un usuario
  getById(id: string): Promise<IUser> {
    return lastValueFrom(
      this.httpClient.get<IUser>(`${this.baseUrl}/${id}`)
    );
  }

  // POST /users — crear usuario
  create(user: IUser): Promise<IResponse> {
    return lastValueFrom(
      this.httpClient.post<IResponse>(this.baseUrl, user, this.getHeaders())
    );
  }

  // PUT /users/:id — actualizar usuario
  update(id: string, user: IUser): Promise<IResponse> {
    return lastValueFrom(
      this.httpClient.put<IResponse>(`${this.baseUrl}/${id}`, user, this.getHeaders())
    );
  }

  // DELETE /users/:id — eliminar usuario
  delete(id: string): Promise<IResponse> {
    return lastValueFrom(
      this.httpClient.delete<IResponse>(`${this.baseUrl}/${id}`, this.getHeaders())
    );
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
}

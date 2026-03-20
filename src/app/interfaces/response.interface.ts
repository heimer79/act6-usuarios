import { IUser } from './user.interface';

export interface IResponse {
  success?: string;
  error?: string;
  result?: IUser;
}

export interface IUsersListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: IUser[];
}

import { IUser } from './user.interface';

export interface IResponse {
  success?: string;
  error?: string;
  result?: IUser;
}

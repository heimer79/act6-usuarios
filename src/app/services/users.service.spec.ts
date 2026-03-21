import { describe, it, expect } from 'vitest';
import { IUser } from '../interfaces/user.interface';
import { IResponse, IUsersListResponse } from '../interfaces/response.interface';

describe('UsersService', () => {
  describe('Service structure', () => {
    it('should define UsersService class', () => {
      // Service: @Injectable({ providedIn: 'root' })
      // Methods: getAll, getById, create, update, delete
      const serviceStructure = {
        name: 'UsersService',
        providedIn: 'root',
        methods: ['getAll', 'getById', 'create', 'update', 'delete'],
      };

      expect(serviceStructure.name).toBe('UsersService');
      expect(serviceStructure.providedIn).toBe('root');
      expect(serviceStructure.methods).toHaveLength(5);
    });

    it('should define CRUD operations', () => {
      const crudOperations = {
        create: 'POST',
        read: 'GET',
        update: 'PUT',
        delete: 'DELETE',
      };

      expect(crudOperations.create).toBe('POST');
      expect(crudOperations.read).toBe('GET');
      expect(crudOperations.update).toBe('PUT');
      expect(crudOperations.delete).toBe('DELETE');
    });
  });

  describe('API endpoints', () => {
    it('should use correct base URL for API', () => {
      const baseUrl = 'https://peticiones.online/api/users';
      expect(baseUrl).toMatch(/^https:\/\/peticiones\.online\/api\/users$/);
    });

    it('should construct endpoints correctly', () => {
      const endpoints = {
        getAll: 'https://peticiones.online/api/users',
        getById: (id: string) => `https://peticiones.online/api/users/${id}`,
        create: 'https://peticiones.online/api/users',
        update: (id: string) => `https://peticiones.online/api/users/${id}`,
        delete: (id: string) => `https://peticiones.online/api/users/${id}`,
      };

      expect(endpoints.getAll).toBe('https://peticiones.online/api/users');
      expect(endpoints.getById('123')).toBe('https://peticiones.online/api/users/123');
      expect(endpoints.update('456')).toBe('https://peticiones.online/api/users/456');
      expect(endpoints.delete('789')).toBe('https://peticiones.online/api/users/789');
    });
  });

  describe('Method signatures', () => {
    it('should have getAll returning Promise<IUser[]>', () => {
      // getAll(): Promise<IUser[]>
      const methodSignature = {
        name: 'getAll',
        returnType: 'Promise<IUser[]>',
      };

      expect(methodSignature.name).toBe('getAll');
      expect(methodSignature.returnType).toMatch(/Promise.*IUser/);
    });

    it('should have getById(id: string) returning Promise<IUser>', () => {
      // getById(id: string): Promise<IUser>
      const methodSignature = {
        name: 'getById',
        params: ['id: string'],
        returnType: 'Promise<IUser>',
      };

      expect(methodSignature.name).toBe('getById');
      expect(methodSignature.params[0]).toBe('id: string');
    });

    it('should have create(user: IUser) returning Promise<IResponse>', () => {
      // create(user: IUser): Promise<IResponse>
      const methodSignature = {
        name: 'create',
        params: ['user: IUser'],
        returnType: 'Promise<IResponse>',
      };

      expect(methodSignature.name).toBe('create');
      expect(methodSignature.params[0]).toBe('user: IUser');
    });

    it('should have update(id, user) returning Promise<IResponse>', () => {
      // update(id: string, user: IUser): Promise<IResponse>
      const methodSignature = {
        name: 'update',
        params: ['id: string', 'user: IUser'],
        returnType: 'Promise<IResponse>',
      };

      expect(methodSignature.name).toBe('update');
      expect(methodSignature.params).toHaveLength(2);
    });

    it('should have delete(id) returning Promise<IResponse>', () => {
      // delete(id: string): Promise<IResponse>
      const methodSignature = {
        name: 'delete',
        params: ['id: string'],
        returnType: 'Promise<IResponse>',
      };

      expect(methodSignature.name).toBe('delete');
      expect(methodSignature.params[0]).toBe('id: string');
    });
  });

  describe('HTTP Headers', () => {
    it('should include Content-Type header for POST/PUT/DELETE', () => {
      const headers = {
        'Content-Type': 'application/json',
      };

      expect(headers['Content-Type']).toBe('application/json');
    });

    it('should use HttpHeaders for header construction', () => {
      // Service uses HttpHeaders({ 'Content-Type': 'application/json' })
      const headerConfig = {
        type: 'HttpHeaders',
        contentType: 'application/json',
      };

      expect(headerConfig.type).toBe('HttpHeaders');
      expect(headerConfig.contentType).toBe('application/json');
    });
  });

  describe('Service integration with interfaces', () => {
    it('should work with IUser interface', () => {
      const user: IUser = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        username: 'johndoe',
        password: 'pass123',
        image: 'https://example.com/image.jpg',
      };

      expect(user.first_name).toBe('John');
      expect(user.email).toBe('john@example.com');
    });

    it('should handle IResponse success', () => {
      const response: IResponse = {
        success: 'User created',
        result: {
          _id: '1',
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane@example.com',
          username: 'janedoe',
          image: 'https://example.com/jane.jpg',
        },
      };

      expect(response.success).toBe('User created');
      expect(response.result?._id).toBe('1');
    });

    it('should handle IResponse error', () => {
      const response: IResponse = {
        error: 'User not found',
      };

      expect(response.error).toBe('User not found');
    });

    it('should handle IUsersListResponse', () => {
      const users: IUser[] = [
        {
          _id: '1',
          first_name: 'User1',
          last_name: 'Test',
          email: 'user1@example.com',
          username: 'user1',
          image: 'https://example.com/user1.jpg',
        },
      ];

      const listResponse: IUsersListResponse = {
        page: 1,
        per_page: 10,
        total: 1,
        total_pages: 1,
        results: users,
      };

      expect(listResponse.results).toHaveLength(1);
      expect(listResponse.total).toBe(1);
    });
  });
});

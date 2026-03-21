import { describe, it, expect } from 'vitest';
import { IResponse, IUsersListResponse } from './response.interface';
import { IUser } from './user.interface';

describe('IResponse Interface', () => {
  it('should create a success response', () => {
    const user: IUser = {
      _id: '123',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      username: 'johndoe',
      image: 'https://example.com/image.jpg',
    };

    const response: IResponse = {
      success: 'User created successfully',
      result: user,
    };

    expect(response.success).toBe('User created successfully');
    expect(response.result).toEqual(user);
    expect(response.error).toBeUndefined();
  });

  it('should create an error response', () => {
    const response: IResponse = {
      error: 'User not found',
    };

    expect(response.error).toBe('User not found');
    expect(response.success).toBeUndefined();
  });
});

describe('IUsersListResponse Interface', () => {
  it('should create a valid users list response', () => {
    const users: IUser[] = [
      {
        _id: '1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        username: 'johndoe',
        image: 'https://example.com/john.jpg',
      },
      {
        _id: '2',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
        username: 'janesmith',
        image: 'https://example.com/jane.jpg',
      },
    ];

    const response: IUsersListResponse = {
      page: 1,
      per_page: 10,
      total: 2,
      total_pages: 1,
      results: users,
    };

    expect(response.page).toBe(1);
    expect(response.per_page).toBe(10);
    expect(response.total).toBe(2);
    expect(response.total_pages).toBe(1);
    expect(response.results).toHaveLength(2);
    expect(response.results[0].first_name).toBe('John');
    expect(response.results[1].first_name).toBe('Jane');
  });
});

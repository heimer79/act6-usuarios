import { describe, it, expect } from 'vitest';
import { IUser } from './user.interface';

describe('IUser Interface', () => {
  it('should create a valid IUser object', () => {
    const user: IUser = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      username: 'johndoe',
      image: 'https://example.com/image.jpg',
    };

    expect(user.first_name).toBe('John');
    expect(user.last_name).toBe('Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.username).toBe('johndoe');
    expect(user.image).toBe('https://example.com/image.jpg');
  });

  it('should allow optional fields like _id and password', () => {
    const user: IUser = {
      _id: '123abc',
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@example.com',
      username: 'janesmith',
      password: 'securepass123',
      image: 'https://example.com/jane.jpg',
    };

    expect(user._id).toBe('123abc');
    expect(user.password).toBe('securepass123');
  });

  it('should allow id field as an alternative to _id', () => {
    const user: IUser = {
      id: 456,
      first_name: 'Bob',
      last_name: 'Johnson',
      email: 'bob@example.com',
      username: 'bobjohnson',
      image: 'https://example.com/bob.jpg',
    };

    expect(user.id).toBe(456);
  });
});

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from './models/user.model';

@Injectable()
export class UserApi {
  getCurrentUser(): Observable<User> {
    return of(mockUser).pipe(delay(500));
  }

  getTeam(): Observable<User[]> {
    return of(mockTeam).pipe(delay(500));
  }
}

const mockUser: User = {
  id: 1,
  firstName: 'Marie',
  lastName: 'Dupont',
  email: 'marie.dupont@example.com',
  avatar: 'https://i.pravatar.cc/150?img=5',
  role: 'Tech Lead',
  department: 'Engineering',
};

const mockTeam: User[] = [
  mockUser,
  {
    id: 2,
    firstName: 'Jean',
    lastName: 'Martin',
    email: 'jean.martin@example.com',
    avatar: 'https://i.pravatar.cc/150?img=6',
    role: 'Developer',
    department: 'Engineering',
  },
  {
    id: 3,
    firstName: 'Sophie',
    lastName: 'Rousseau',
    email: 'sophie.rousseau@example.com',
    avatar: 'https://i.pravatar.cc/150?img=7',
    role: 'Designer',
    department: 'Design',
  },
  {
    id: 4,
    firstName: 'Pierre',
    lastName: 'Durand',
    email: 'pierre.durand@example.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
    role: 'Developer',
    department: 'Engineering',
  },
];

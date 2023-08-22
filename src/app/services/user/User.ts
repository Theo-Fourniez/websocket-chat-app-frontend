import { Friend } from 'src/app/types/Friend';

export interface User {
  username: string;
  friends: Friend[];
}

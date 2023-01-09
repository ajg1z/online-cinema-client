export interface IUser {
  _id: string;
  email: string;
  createdAt: string;
  isAdmin: boolean;
}

export type UserRole = `admin` | `user`;

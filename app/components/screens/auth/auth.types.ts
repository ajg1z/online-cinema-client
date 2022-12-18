export type AuthType = `login` | `register`;

export interface IAuthInput {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
}
export interface UserReducerIntital {
  loading: boolean;
  error: string | boolean;
  user: User | null;
}

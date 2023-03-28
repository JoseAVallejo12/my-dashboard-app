export interface User {
  name: string;
  id: number;
  email: string;
  password: string;
  token?: string;
}

export interface Pokemon {
  name: string;
  id: number;
}

export interface Credentials {
  email: string;
  password: string;
}

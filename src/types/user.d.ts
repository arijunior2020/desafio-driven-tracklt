// src/types/user.d.ts

export interface User {
  id: number;
  name: string;
  email: string;
  image: string;
  token: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  image: string;
}

export interface SignInData {
  email: string;
  password: string;
}

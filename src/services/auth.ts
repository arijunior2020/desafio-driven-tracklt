import { api } from "./api";
import { SignUpData, SignInData, User } from "../types/user";

export function signUp(data: SignUpData) {
  return api.post("/auth/sign-up", data);
}

export function signIn(data: SignInData) {
  return api.post<User>("/auth/login", data);
}

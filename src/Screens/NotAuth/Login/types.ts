export interface Values {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  refreshToken: string;
}

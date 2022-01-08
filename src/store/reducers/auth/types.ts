export type IAuth = {
  token: string;
  refreshToken: string;
  signed: boolean;
  establishmentExists: boolean;
};

export type IFetchLoginPlayload = {
  email: string;
  password: string;
};

export type IFetchLoginReturned = {
  token: string;
  refreshToken: string;
};

export type IFetchRefreshTokenReturned = IFetchLoginReturned;

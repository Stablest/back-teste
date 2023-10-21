export interface ITokenResponse {
  user: ITokenUser;
  token: string;
}

export interface ITokenUser {
  id: number;
}

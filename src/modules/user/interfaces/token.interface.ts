import { Permission } from "./permission.enum";

export interface ITokenResponse {
  user: ITokenUser;
  token: string;
}

export interface ITokenUser {
  id: number;
  permission?: Permission;
}

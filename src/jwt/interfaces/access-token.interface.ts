import { ITokenBase } from "./token-base.interface";

export interface IAccessPayload {
  sessionId: string; //session id
}

export interface IAccessToken extends IAccessPayload, ITokenBase {}

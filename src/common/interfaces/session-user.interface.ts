import { IUserSession } from "./session.interface";

declare interface ICreate<T, X = never> {
  body: T;
  user: IUserSession;
  extend?: X;
}

declare interface IUpdate<T, X = never> {
  id: string;
  body: T;
  user: IUserSession;
  extend?: X;
}

declare interface IDelete<X = never> {
  id: string;
  user: IUserSession;
  extend?: X;
}

declare interface IGet<X = never> {
  id: string;
  user: IUserSession;
  extend?: X;
}

declare interface IGetAll<T = undefined> {
  page?: number;
  limit?: number;
  filter?: string;
  archive?: boolean;
  withId?: string;
  q?: string;
  user: IUserSession;
  extend?: T;
}

export declare namespace SessionUserParam {
  export type { ICreate, IUpdate, IDelete, IGet, IGetAll };
}
